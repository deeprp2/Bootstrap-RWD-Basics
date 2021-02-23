let context;
let circles = [];
let canvas = null;
let radius = 50;

document.addEventListener("DOMContentLoaded", function () {
    canvas = document.getElementById("html-canvas");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    context = canvas.getContext("2d");
    draw();
}, false);

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawRectangle(400, 400, 200, 200, '#0000FF')
    drawCircle(200, 200, 100, '#FF0000')
    drawImage(10, 10, 100, 100)
    drawImage(500, 90, 100, 100)
    drawImage(500, 220, 100, 100)
    context.font = "20px Georgia";
    context.strokeText('Deep Patel', 90, 500)
    requestAnimationFrame(draw);
}

function drawRectangle(x, y, height, width, fill_color) {
    context.shadowColor = 'red';
    context.shadowBlur = 15;
    context.beginPath();
    context.rect(x, y, width, height);
    context.fillStyle = fill_color;
    context.closePath();
    context.fill();
    context.stroke();
}

function drawCircle(x, y, radius, fill_color) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fillStyle = fill_color;
    context.closePath();
    context.fill();
    context.stroke();
}

function drawImage(x, y, width, height) {
    let image = document.createElement('img')
    image.src = 'chicago.jpg'
    context.drawImage(image, x, y, width, height)
}
