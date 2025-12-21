const canvas = document.getElementById('animationCanvas');
const recordButton = document.getElementById('recordButton');
const debugTime = document.getElementById('debugTime');
const actualTime = document.getElementById('actualTime');
const ctx = canvas.getContext('2d');

const CONFIG = {
    BALL_RADIUS: 12,
    FPS: 60,
    HORSE_MARGIN_X: 50,
    HORSE_MARGIN_Y: 15,
    VIDEO_START_TIME_OFFSET: (1 * 60) + 39,
    MEDIA_RECORDER_OPTIONS: { mimeType: 'video/webm; codecs=vp9' },
    HORSES: [
        { number: "1", color: "white", textColor: "black" },
        { number: "2", color: "black", textColor: "white" },
        { number: "3", color: "red", textColor: "white" },
        { number: "4", color: "blue", textColor: "white" },
        { number: "5", color: "yellow", textColor: "black" },
        { number: "6", color: "green", textColor: "white" },
        { number: "7", color: "orange", textColor: "white" },
        { number: "8", color: "pink", textColor: "black" },
    ]
};

class Horse {
    constructor(number, color, textColor, initX, initY) {
        this.number = number;
        this.color = color;
        this.textColor = textColor;
        this.x = initX;
        this.y = initY;
        this.rotation = 0; // Rotation in radians
        this.canvas = this.createOffscreenCanvas();
    }

    createOffscreenCanvas() {
        const horseCanvas = document.createElement('canvas');
        const horseCtx = horseCanvas.getContext('2d');
        // Set canvas dimensions explicitly to avoid truncation issues
        horseCanvas.width = CONFIG.BALL_RADIUS * 4; // Sufficient width for ball and triangle
        horseCanvas.height = CONFIG.BALL_RADIUS * 4; // Sufficient height

        const ballInnerRadius = 10;
        const ballSize = horseCanvas.width / 2; // Center the ball in the canvas

        // Draw the ball onto the off-screen canvas
        horseCtx.beginPath();
        horseCtx.arc(ballSize, ballSize, ballInnerRadius, 0, Math.PI * 2);
        horseCtx.fillStyle = this.color;
        horseCtx.fill();
        horseCtx.closePath();

        // Draw the outer circle
        horseCtx.beginPath();
        horseCtx.arc(ballSize, ballSize, CONFIG.BALL_RADIUS, 0 * Math.PI, 2 * Math.PI);
        horseCtx.strokeStyle = this.color;
        horseCtx.lineWidth = 1;
        horseCtx.stroke();
        horseCtx.closePath();

        // Draw the small triangle
        const triangleBase = 6;
        const triangleHeight = 8;
        const triangleY = ballSize;
        const triangleX = ballSize - CONFIG.BALL_RADIUS + 1; // Position for left-pointing triangle

        horseCtx.beginPath();
        horseCtx.moveTo(triangleX, triangleY - triangleHeight / 2);
        horseCtx.lineTo(triangleX - triangleBase, triangleY);
        horseCtx.lineTo(triangleX, triangleY + triangleHeight / 2);

        horseCtx.fillStyle = this.color;
        horseCtx.fill();
        horseCtx.closePath();

        return horseCanvas;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        // 1. Draw the rotated body (circle + triangle)
        ctx.save();
        ctx.rotate(this.rotation);
        ctx.drawImage(this.canvas, -this.canvas.width / 2, -this.canvas.height / 2);
        ctx.restore();

        // 2. Draw the upright number
        ctx.font = "10px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = this.textColor;
        ctx.fillText(this.number, 0, 0);

        ctx.restore();
    }
}

let currentFrame = 0;
const totalAnimationDurationInSeconds = horsePositions[horsePositions.length - 1].second;
const totalAnimationFrames = totalAnimationDurationInSeconds * CONFIG.FPS;
const horses = CONFIG.HORSES.map((prop, i) =>
    new Horse(prop.number, prop.color, prop.textColor)
);

let animationStartTime = null;

function displayDebugTime(currentTimeInSeconds) {
    if (currentFrame === 0) {
        animationStartTime = performance.now();
    }
    if (animationStartTime) {
        const now = performance.now();
        const elapsed = (now - animationStartTime) / 1000;
        const totalSeconds = Math.floor(CONFIG.VIDEO_START_TIME_OFFSET + elapsed);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        actualTime.innerText = `Actual Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    const totalSeconds = Math.floor(CONFIG.VIDEO_START_TIME_OFFSET + currentTimeInSeconds);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    debugTime.innerText = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const currentTimeInSeconds = currentFrame / CONFIG.FPS;
    displayDebugTime(currentTimeInSeconds);

    let fromKeyFrame, toKeyFrame;
    for (let i = 0; i < horsePositions.length - 1; i++) {
        if (currentTimeInSeconds >= horsePositions[i].second && currentTimeInSeconds < horsePositions[i + 1].second) {
            fromKeyFrame = horsePositions[i];
            toKeyFrame = horsePositions[i + 1];
            break;
        }
    }

    let interpolatedPositions = [];
    let theta = 0;

    if (fromKeyFrame && toKeyFrame) {
        const timeInSegment = currentTimeInSeconds - fromKeyFrame.second;
        const segmentDuration = toKeyFrame.second - fromKeyFrame.second;
        const segmentProgress = timeInSegment / segmentDuration;

        const fromDir = fromKeyFrame.direction || 'left';
        const toDir = toKeyFrame.direction || fromDir;

        // Calculate Theta (Rotation Angle)
        if (fromDir === 'left' && toDir === 'right') {
            theta = segmentProgress * Math.PI;
        } else if (fromDir === 'right' && toDir === 'left') {
            theta = Math.PI + segmentProgress * Math.PI;
        } else if (fromDir === 'right') {
            theta = Math.PI;
        } else {
            theta = 0;
        }

        for (let i = 0; i < horses.length; i++) {
            const fromPos = fromKeyFrame.positions[i];
            const toPos = toKeyFrame.positions[i];

            const interpolatedX = fromPos.x + (toPos.x - fromPos.x) * segmentProgress;
            const interpolatedY = fromPos.y + (toPos.y - fromPos.y) * segmentProgress;

            interpolatedPositions.push({ x: interpolatedX, y: interpolatedY });
        }
    } else {
        // Last keyframe state
        const lastKeyFrame = horsePositions[horsePositions.length - 1];
        const lastDir = lastKeyFrame.direction || 'left';
        theta = (lastDir === 'right') ? Math.PI : 0;
        for (let i = 0; i < horses.length; i++) {
            interpolatedPositions.push({ x: lastKeyFrame.positions[i].x, y: lastKeyFrame.positions[i].y });
        }
    }

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const verticalScale = canvas.height / canvas.width; // Approx 1/3

    for (let i = 0; i < horses.length; i++) {
        const pos = interpolatedPositions[i];
        
        // 1. Calculate Base Position (as if direction is 'left')
        // Lead horse (x=0) is at CONFIG.HORSE_MARGIN_X
        // y is distance from the "inner rail" (Top for Left, Bottom for Right)
        // Since we rotate around the center, a point at Top (y) rotates to Bottom (h-y)
        // So we use pos.y directly as the base Y coordinate.
        const baseX = CONFIG.HORSE_MARGIN_X + (0 - pos.x) * CONFIG.BALL_RADIUS * 2;
        const baseY = pos.y + CONFIG.HORSE_MARGIN_Y;

        // 2. Center coordinates relative to canvas center
        const rx = baseX - cx;
        // Un-squash Y to match X scale for rotation (assuming Y was screen coords)
        const ry = (baseY - cy) / verticalScale; 

        // 3. Rotate
        // x' = x cos θ - y sin θ
        // y' = x sin θ + y cos θ
        const rx_rot = rx * Math.cos(theta) - ry * Math.sin(theta);
        const ry_rot = rx * Math.sin(theta) + ry * Math.cos(theta);

        // 4. Re-project to screen (Re-squash Y)
        const finalX = cx + rx_rot;
        const finalY = cy + ry_rot * verticalScale;

        // Set properties
        horses[i].x = finalX;
        horses[i].y = finalY;
        horses[i].rotation = theta;

        horses[i].draw();
    }

    drawRanking(interpolatedPositions);

    currentFrame += 1;
    if (currentFrame >= totalAnimationFrames) {
        // end recording
        return;
    }
    requestAnimationFrame(animate);
}

const dress_svg = '<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 338 511.636"><path fill-rule="nonzero" d="M82.863 0h33.476l1.183 5.897c3.756 18.724 13.481 31.849 25.584 39.256a49.083 49.083 0 0025.052 7.241c8.668.101 17.404-2.122 25.269-6.712 12.444-7.262 22.685-20.515 27.08-39.957L221.801 0h41.118c-.903 14.518-1.825 29.036-2.709 43.555-1.126 18.444-1.209 19.841 2.899 37.925 7.994 35.167 1.566 54.641-4.904 74.238-3.971 12.03-7.96 24.114-7.96 40.198v8.382c-25.257.549-56.715.931-87.624 1.014-26.748.072-53.153-.077-74.865-.533v-8.863c0-16.084-3.989-28.168-7.96-40.198-6.469-19.597-12.898-39.071-4.904-74.238C79 63.396 78.916 61.999 77.791 43.555 76.907 29.036 75.985 14.518 75.081 0h7.782zM254.68 218.804c20.138 39.172 36.254 79.293 49.311 120.132 14.16 44.289 24.712 89.392 32.888 135.027l1.121 6.261-6.016 1.983a568.495 568.495 0 01-28.824 8.642c-7.591-41.629-16.302-83.186-27.743-124.528-11.703-42.282-26.243-84.227-45.335-125.603-1.026-2.233-3.595-3.178-5.739-2.11-2.143 1.068-3.05 3.745-2.025 5.978 18.879 40.914 33.257 82.388 44.828 124.197 11.368 41.077 20.052 82.595 27.642 124.274a620.152 620.152 0 01-43.025 9.389c-29.173 5.297-56.826 8.256-85.492 9.19V252.651c0-2.485-1.935-4.501-4.32-4.501-2.386 0-4.321 2.016-4.321 4.501v258.391c-22.129-1.24-46.336-4.047-71.392-8.596a620.76 620.76 0 01-43.026-9.389c7.572-41.66 15.819-83.185 26.762-124.31 11.129-41.823 25.057-83.291 43.914-124.161 1.025-2.233.118-4.91-2.025-5.978-2.143-1.068-4.713-.123-5.738 2.11-19.112 41.421-33.206 83.372-44.454 125.639-10.988 41.294-19.254 82.844-26.831 124.492a568.152 568.152 0 01-28.823-8.642L0 480.224l1.122-6.261c8.177-45.635 18.728-90.738 32.887-135.027 13.005-40.673 29.044-80.636 49.068-119.657 22.512.532 50.807.708 79.544.631 32.845-.089 66.174-.508 92.059-1.106z"/></svg>'

const dressImg = new Image();
dressImg.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(dress_svg);

function drawRanking(interpolatedPositions) {
    const ranking = interpolatedPositions
        .map((pos, i) => ({ index: i, x: pos.x }))
        .sort((a, b) => b.x - a.x)
        .slice(0, 3);

    const boxSize = 20;
    const startX = 10;
    const startY = 10;
    const gap = 10;

    ranking.forEach((item, i) => {
        const horse = horses[item.index];
        const y = startY + i * (boxSize + gap);

        // Draw Horse Dress (Colored Box with Horse Number) to the right
        const dressX = startX;
        
        ctx.fillStyle = horse.color;
        ctx.fillRect(dressX, y, boxSize, boxSize);

        ctx.fillStyle = horse.textColor;
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(horse.number, dressX + boxSize / 2, y + boxSize / 2);

        // Draw Wedding Dress Icon to the right of the horse box
        const iconX = dressX + boxSize + 5;
        // Maintain aspect ratio: 338x511. Scale height to boxSize.
        const aspect = 338 / 511;
        const iconWidth = boxSize * aspect;
        
        if (dressImg.complete) {
             ctx.drawImage(dressImg, iconX, y, iconWidth, boxSize);
        }
    });
}

let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

animate();

recordButton.addEventListener('click', () => {
    // for just debugging.
    animate();
    return;

    if (isRecording) {
        // Stop recording
        isRecording = false;
        mediaRecorder.stop();
        recordButton.textContent = 'Start Recording';
    } else {
        // Start recording
        isRecording = true;
        currentFrame = 0;

        const stream = canvas.captureStream(CONFIG.FPS);
        mediaRecorder = new MediaRecorder(stream, CONFIG.MEDIA_RECORDER_OPTIONS);

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: mediaRecorder.mimeType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const timestamp = new Date().getTime();
            a.download = `animation_${timestamp}.webm`;
            a.click();
            URL.revokeObjectURL(url);
            recordedChunks = [];
        };

        mediaRecorder.start();
        recordButton.textContent = 'Stop Recording';
        animate();
    }
});