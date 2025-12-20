const canvas = document.getElementById('animationCanvas');
const recordButton = document.getElementById('recordButton');
const debugTime = document.getElementById('debugTime');

const ctx = canvas.getContext('2d');
const ballRadius = 12;
const FPS = 60;

let currentFrame = 0;
const totalAnimationDurationInSeconds = horsePositions[horsePositions.length - 1].second;
const totalAnimationFrames = totalAnimationDurationInSeconds * FPS;

class Horse {
    constructor(number, color, textColor, initX, initY) {
        this.number = number;
        this.color = color;
        this.textColor = textColor;
        this.x = initX;
        this.y = initY;
        this._direction = 'left'; // Internal storage for direction
        this.canvas = this.createOffscreenCanvas(this._direction);
    }

    // Setter for direction property
    set direction(newDirection) {
        if (this._direction !== newDirection) {
            this._direction = newDirection;
            this.canvas = this.createOffscreenCanvas(this._direction); // Regenerate canvas on direction change
        }
    }

    // Getter for direction property
    get direction() {
        return this._direction;
    }

    createOffscreenCanvas(direction) {
        const horseCanvas = document.createElement('canvas');
        const horseCtx = horseCanvas.getContext('2d');
        // Set canvas dimensions explicitly to avoid truncation issues
        horseCanvas.width = ballRadius * 4; // Sufficient width for ball and triangle
        horseCanvas.height = ballRadius * 4; // Sufficient height

        const ballInnerRadius = 10;
        const ballSize = horseCanvas.width / 2; // Center the ball in the canvas

        // Draw the ball onto the off-screen canvas
        horseCtx.beginPath();
        horseCtx.arc(ballSize, ballSize, ballInnerRadius, 0, Math.PI * 2);
        horseCtx.fillStyle = this.color;
        horseCtx.fill();
        horseCtx.closePath();

        // Draw the number inside the ball on the off-screen canvas
        horseCtx.font = "10px Arial";
        horseCtx.textAlign = "center";
        horseCtx.textBaseline = "middle";
        horseCtx.fillStyle = this.textColor;
        horseCtx.fillText(this.number, ballSize, ballSize);

        // Draw the outer circle
        horseCtx.beginPath();
        horseCtx.arc(ballSize, ballSize, ballRadius, 0.15 * Math.PI, 1.85 * Math.PI);
        horseCtx.strokeStyle = this.color;
        horseCtx.lineWidth = 1;
        horseCtx.stroke();
        horseCtx.closePath();

        // Draw the small triangle
        const triangleBase = 6;
        const triangleHeight = 8;
        const triangleY = ballSize;
        let triangleX;

        horseCtx.beginPath();
        if (direction === 'left') {
            triangleX = ballSize - ballRadius + 1; // Position for left-pointing triangle
            horseCtx.moveTo(triangleX, triangleY - triangleHeight / 2);
            horseCtx.lineTo(triangleX - triangleBase, triangleY);
            horseCtx.lineTo(triangleX, triangleY + triangleHeight / 2);
        } else { // 'right'
            triangleX = ballSize + ballRadius - 1; // Position for right-pointing triangle
            horseCtx.moveTo(triangleX, triangleY - triangleHeight / 2);
            horseCtx.lineTo(triangleX + triangleBase, triangleY);
            horseCtx.lineTo(triangleX, triangleY + triangleHeight / 2);
        }

        horseCtx.fillStyle = this.color;
        horseCtx.fill();
        horseCtx.closePath();

        return horseCanvas;
    }

    draw() {
        // Adjust drawing to center the offscreen canvas content relative to horse's x,y
        ctx.drawImage(this.canvas, this.x - this.canvas.width / 2, this.y - this.canvas.height / 2);
    }
}

const horseProperties = [
    { number: "1", color: "white", textColor: "black" },
    { number: "2", color: "black", textColor: "white" },
    { number: "3", color: "red", textColor: "white" },
    { number: "4", color: "blue", textColor: "white" },
    { number: "5", color: "yellow", textColor: "black" },
    { number: "6", color: "green", textColor: "white" },
    { number: "7", color: "orange", textColor: "white" },
    { number: "8", color: "pink", textColor: "white" },
];

const horses = horseProperties.map((prop, i) =>
    new Horse(prop.number, prop.color, prop.textColor, horsePositions[0].positions[i].x, horsePositions[0].positions[i].y)
);

// Pre-process horsePositions to ensure direction is set for all keyframes
let lastDirection = 'left'; // Default initial direction
for (const keyframe of horsePositions) {
    if (!keyframe.direction) {
        keyframe.direction = lastDirection;
    } else {
        // Ensure the direction is valid, otherwise default to 'left'
        if (keyframe.direction !== 'left' && keyframe.direction !== 'right') {
            console.warn(`Invalid direction '${keyframe.direction}' in keyframe at second ${keyframe.second}. Defaulting to 'left'.`);
            keyframe.direction = 'left';
        }
        lastDirection = keyframe.direction;
    }
}

const options = { mimeType: 'video/webm; codecs=vp9' };
let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

function animate() {
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log("Not Supported");
        return;
    }

    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error("VP9 codec is not supported on this browser.");
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const currentTimeInSeconds = currentFrame / FPS;

    const startSeconds = (1 * 60) + 39;
    const totalSeconds = Math.floor(startSeconds + currentTimeInSeconds);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    debugTime.innerText = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;

    let fromKeyFrame, toKeyFrame;
    for (let i = 0; i < horsePositions.length - 1; i++) {
        if (currentTimeInSeconds >= horsePositions[i].second && currentTimeInSeconds < horsePositions[i + 1].second) {
            fromKeyFrame = horsePositions[i];
            toKeyFrame = horsePositions[i + 1];
            break;
        }
    }

    let interpolatedPositions = [];
    let currentAnimationDirection = 'left'; // Default for the current segment

    if (fromKeyFrame && toKeyFrame) {
        currentAnimationDirection = fromKeyFrame.direction; // Get direction from the segment's start keyframe
        const timeInSegment = currentTimeInSeconds - fromKeyFrame.second;
        const segmentDuration = toKeyFrame.second - fromKeyFrame.second;
        const segmentProgress = timeInSegment / segmentDuration;

        for (let i = 0; i < horses.length; i++) {
            const fromPos = fromKeyFrame.positions[i];
            const toPos = toKeyFrame.positions[i];

            const interpolatedX = fromPos.x + (toPos.x - fromPos.x) * segmentProgress;
            const interpolatedY = fromPos.y + (toPos.y - fromPos.y) * segmentProgress;

            interpolatedPositions.push({ x: interpolatedX, y: interpolatedY });
        }
    } else {
        // If before first keyframe or after last keyframe, use the last known state
        const lastKeyFrame = horsePositions[horsePositions.length - 1];
        currentAnimationDirection = lastKeyFrame.direction;
        for (let i = 0; i < horses.length; i++) {
            interpolatedPositions.push({ x: lastKeyFrame.positions[i].x, y: lastKeyFrame.positions[i].y });
        }
    }

    const topX = 0; // Lead horse is at x=0
    const topHorseMargin = 50; // Margin from the edge of the canvas

    for (let i = 0; i < horses.length; i++) {
        const pos = interpolatedPositions[i];
        horses[i].direction = currentAnimationDirection; // Set direction, triggers canvas regeneration if changed

        // Calculate x position based on direction
        // (topX - pos.x) gives the distance *behind* the leader (positive value for trailing horses)
        if (currentAnimationDirection === 'left') {
            // Running left: leader at left margin, trailing horses to its right
            horses[i].x = topHorseMargin + (topX - pos.x) * ballRadius * 2;
        } else { // currentAnimationDirection === 'right'
            // Running right: leader at right margin, trailing horses to its left
            horses[i].x = canvas.width - topHorseMargin - (topX - pos.x) * ballRadius * 2;
        }

        horses[i].y = pos.y;
        horses[i].draw();
    }

    currentFrame = (currentFrame + 1);
    if (currentFrame >= totalAnimationFrames) {
        currentFrame = totalAnimationFrames;
    }
    if (isRecording) {
        requestAnimationFrame(animate);
    }
}

recordButton.addEventListener('click', () => {
    if (isRecording) {
        // Stop recording
        isRecording = false;
        mediaRecorder.stop();
        recordButton.textContent = 'Start Recording';
    } else {
        // Start recording
        isRecording = true;
        currentFrame = 0;

        const stream = canvas.captureStream(FPS);
        mediaRecorder = new MediaRecorder(stream, options);

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