const canvas = document.getElementById('animationCanvas');
const offscreenCanvas = document.getElementById('offscreenCanvas');
const recordButton = document.getElementById('recordButton');

const ctx = canvas.getContext('2d');
const ballCtx = offscreenCanvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 12;

// Prepare horses

function createOffscreenCanvas(horseNumber, horseColor) {
    const initX = 20;
    const initY = 20;
    const ballInnerRadius = 10;

    // Draw the ball onto the off-screen canvas
    ballCtx.beginPath();
    ballCtx.arc(initX, initY, ballInnerRadius, 0, Math.PI * 2);
    ballCtx.fillStyle = horseColor;
    ballCtx.fill();
    ballCtx.closePath();

    // Draw the number inside the ball on the off-screen canvas
    ballCtx.font = "10px Arial";
    ballCtx.textAlign = "center";
    ballCtx.textBaseline = "middle";
    ballCtx.fillStyle = "#FFFFFF";
    ballCtx.fillText(horseNumber, initX, initY);

    // Draw the outer circle
    ballCtx.beginPath();
    ballCtx.arc(initX, initY, ballRadius, 0.15 * Math.PI, 1.85 * Math.PI); // Radius 12px
    ballCtx.strokeStyle = horseColor;
    ballCtx.lineWidth = 1; // 1px width
    ballCtx.stroke();
    ballCtx.closePath();

    // Draw the small triangle to the right of the ball
    const triangleBase = 6;
    const triangleHeight = 8;
    const triangleX = initX + ballRadius - 1; // Position to the right of the outer circle + a small gap
    const triangleY = initY;

    ballCtx.beginPath();
    ballCtx.moveTo(triangleX, triangleY - triangleHeight / 2); // Top point
    ballCtx.lineTo(triangleX + triangleBase, triangleY); // Right point
    ballCtx.lineTo(triangleX, triangleY + triangleHeight / 2); // Bottom point
    ballCtx.fillStyle = horseColor;
    ballCtx.fill();
    ballCtx.closePath();
}

// Pre-render the ball
createOffscreenCanvas("1", "#0095DD");

function drawBall() {
    // Draw the pre-rendered ball onto the main canvas
    ctx.drawImage(offscreenCanvas, x - ballRadius, y - ballRadius);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    x += dx;
    //y += dy;
}

const options = { mimeType: 'video/mp4;codecs=avc1.424028,mp4a.40.2' };
let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

function animate() {
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log("Not Supported");
        return;
    }
    update();
    requestAnimationFrame(animate);
}

recordButton.addEventListener('click', () => {
    if (isRecording) {
        mediaRecorder.stop();
        recordButton.textContent = 'Start Recording';
    } else {
        const stream = canvas.captureStream();
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
            a.download = `animation_${timestamp}.mp4`;
            a.click();
            URL.revokeObjectURL(url);
            recordedChunks = [];
        };

        mediaRecorder.start();
        recordButton.textContent = 'Stop Recording';
    }
    isRecording = !isRecording;
});

animate();
