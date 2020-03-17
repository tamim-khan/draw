const socket = io('http://localhost:3000');

function setup() {
  createCanvas(displayWidth, displayHeight);
  background(255);

  socket.on('coord', (data) => {
    drawEllipse(data.x, data.y, 150);
  });
}

function mouseDragged() {
  let coord = {
    x: mouseX,
    y: mouseY
  };
  socket.emit('coord', coord);

  drawEllipse(mouseX, mouseY, 50);
}

function drawEllipse(x, y, color) {
  noStroke();
  fill(color);
  ellipse(x, y, 10, 10);
}
