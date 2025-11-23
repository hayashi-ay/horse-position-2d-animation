const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');
const recordButton = document.getElementById('recordButton');

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 10;

let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
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
    y += dy;
}

const options = { mimeType: 'video/mp4;codecs=avc1.424028,mp4a.40.2' };

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
