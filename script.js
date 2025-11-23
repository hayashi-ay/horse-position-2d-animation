const canvas = document.getElementById('animationCanvas');
const recordButton = document.getElementById('recordButton');

const ctx = canvas.getContext('2d');
const ballRadius = 12;

class Horse {
    constructor(number, color) {
        this.number = number;
        this.color = color;
        this.x = canvas.width / 2;
        this.y = canvas.height - 30;
        this.dx = 2;
        this.dy = -2;
        this.canvas = this.createOffscreenCanvas();
    }

    createOffscreenCanvas() {
        const horseCanvas = document.createElement('canvas');
        const horseCtx = horseCanvas.getContext('2d');
        const initX = 20;
        const initY = 20;
        const ballInnerRadius = 10;

        // Draw the ball onto the off-screen canvas
        horseCtx.beginPath();
        horseCtx.arc(initX, initY, ballInnerRadius, 0, Math.PI * 2);
        horseCtx.fillStyle = this.color;
        horseCtx.fill();
        horseCtx.closePath();

        // Draw the number inside the ball on the off-screen canvas
        horseCtx.font = "10px Arial";
        horseCtx.textAlign = "center";
        horseCtx.textBaseline = "middle";
        horseCtx.fillStyle = "#FFFFFF";
        horseCtx.fillText(this.number, initX, initY);

        // Draw the outer circle
        horseCtx.beginPath();
        horseCtx.arc(initX, initY, ballRadius, 0.15 * Math.PI, 1.85 * Math.PI); // Radius 12px
        horseCtx.strokeStyle = this.color;
        horseCtx.lineWidth = 1; // 1px width
        horseCtx.stroke();
        horseCtx.closePath();

        // Draw the small triangle to the right of the ball
        const triangleBase = 6;
        const triangleHeight = 8;
        const triangleX = initX + ballRadius - 1; // Position to the right of the outer circle + a small gap
        const triangleY = initY;

        horseCtx.beginPath();
        horseCtx.moveTo(triangleX, triangleY - triangleHeight / 2); // Top point
        horseCtx.lineTo(triangleX + triangleBase, triangleY); // Right point
        horseCtx.lineTo(triangleX, triangleY + triangleHeight / 2); // Bottom point
        horseCtx.fillStyle = this.color;
        horseCtx.fill();
        horseCtx.closePath();

        return horseCanvas;
    }

    draw() {
        ctx.drawImage(this.canvas, this.x - ballRadius, this.y - ballRadius);
    }

    update() {
        if (this.x + this.dx > canvas.width - ballRadius || this.x + this.dx < ballRadius) {
            this.dx = -this.dx;
        }
        if (this.y + this.dy > canvas.height - ballRadius || this.y + this.dy < ballRadius) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        //this.y += this.dy;
    }
}

const horses = [
    new Horse("1", "white"),
    new Horse("1", "black")
];

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const horse of horses) {
        horse.update();
        horse.draw();
    }
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
