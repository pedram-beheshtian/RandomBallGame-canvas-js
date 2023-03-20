let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext("2d");
//---------
class Ball {
  constructor(x, y) {
    this.baseR = randomIntNumber(25, 110);
    this.r = this.baseR;
    this.x = x || randomIntNumber(0 + this.r, window.innerWidth - this.r);
    this.y = y || randomIntNumber(0 + this.r, window.innerHeight - this.r);
    this.vx = (Math.random() - 0.5) * 5;
    this.vy = (Math.random() - 0.5) * 5;
    this.randomLineWhidth = randomIntNumber(0, 20);
    this.randomColorFill = `#${randomColor()}`;
    this.randomColorStroke = `#${randomColor()}`;
    //
    this.draw();
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    c.lineWidth = this.randomLineWhidth;
    c.strokeStyle = this.randomColorStroke;
    c.fillStyle = this.randomColorFill;
    c.stroke();
    c.fill();
  }
  update() {
    if (this.x + this.r > window.innerWidth || this.x - this.r < 0) {
      this.vx = -this.vx;
    }
    if (this.y + this.r > window.innerHeight || this.y - this.r < 0) {
      this.vy = -this.vy;
    }
    this.x += this.vx;
    this.y += this.vy;
    //
    this.draw();
  }
}
//
let balls = [];
for (let i = 0; i < 75; i++) {
  balls.push(new Ball());
}
//
function animate() {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  balls.forEach((e) => {
    e.update();
  });
  requestAnimationFrame(animate);
}
window.addEventListener("click", (e) => {
  balls.push(new Ball(e.clientX, e.clientY));
});
window.addEventListener("mousemove", (e) => {
  balls.forEach((ball) => {
    let distanse = Math.sqrt(
      Math.pow(e.clientX - ball.x, 2) + Math.pow(e.clientY - ball.y, 2)
    );
    if (distanse < 100 && ball.r < ball.baseR * 3) {
      ball.r += 1;
    } else if (ball.r > ball.baseR) {
      ball.r -= 1;
    }
  });
});
window.addEventListener("resize", (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
animate();
//---------
function randomIntNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColor() {
  return Math.floor(Math.random() * 16777215).toString(17);
}
