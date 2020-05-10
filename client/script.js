const socket = io(/* 'http://host:port/' */);
var pressure = 0;

function setup() {
  disableScroll();
  createCanvas(displayWidth, displayHeight);
  Pressure.set('canvas', {
    change: (force, event) => {
      pressure = force;
    }
  });
  background(255);

  socket.on('coord', (data) => {
    stroke(128);
    strokeWeight(10 * data.pressure);
    line(data.x, data.y, data.px, data.py);
  });
}

function mouseDragged() {
  let coord = {
    x: mouseX,
    y: mouseY,
    px: pmouseX,
    py: pmouseY,
    pressure: pressure
  };
  socket.emit('coord', coord);
  stroke(50);
  strokeWeight(10 * pressure);
  line(mouseX, mouseY, pmouseX, pmouseY);
}

function disableScroll() {
  document.body.addEventListener(
    'touchmove',
    (e) => {e.preventDefault()},
    { 
      passive: false
    }
  );
}
