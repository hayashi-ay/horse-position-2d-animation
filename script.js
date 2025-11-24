const canvas = document.getElementById('animationCanvas');
const recordButton = document.getElementById('recordButton');

const ctx = canvas.getContext('2d');
const ballRadius = 12;

let currentFrame = 0;
const frameCount = frames.length;

class Horse {
    constructor(number, color, textColor, initX, initY) {
        this.number = number;
        this.color = color;
        this.textColor = textColor;
        this.x = initX;
        this.y = initY;
        this.canvas = this.createOffscreenCanvas();
    }

    createOffscreenCanvas() {
        const horseCanvas = document.createElement('canvas');
        const horseCtx = horseCanvas.getContext('2d');
        const ballInnerRadius = 10;
        const ballSize = ballRadius * 2;

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

        // Draw the small triangle to the right of the ball
        const triangleBase = 6;
        const triangleHeight = 8;
        const triangleX = ballSize + ballRadius - 1;
        const triangleY = ballSize;

        horseCtx.beginPath();
        horseCtx.moveTo(triangleX, triangleY - triangleHeight / 2);
        horseCtx.lineTo(triangleX + triangleBase, triangleY);
        horseCtx.lineTo(triangleX, triangleY + triangleHeight / 2);
        horseCtx.fillStyle = this.color;
        horseCtx.fill();
        horseCtx.closePath();

        return horseCanvas;
    }

    draw() {
        ctx.drawImage(this.canvas, this.x - ballRadius, this.y - ballRadius);
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
    new Horse(prop.number, prop.color, prop.textColor, frames[0][i].x, frames[0][i].y)
);

const options = { mimeType: 'video/mp4;codecs=avc1.424028,mp4a.40.2' };
let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

function animate() {
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log("Not Supported");
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const framePositions = frames[currentFrame];

    for (let i = 0; i < horses.length; i++) {
        horses[i].x = framePositions[i].x;
        horses[i].y = framePositions[i].y;
        horses[i].draw();
    }

    currentFrame = (currentFrame + 1) % frameCount;
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