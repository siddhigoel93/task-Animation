const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = 'black';
const balls = []
class Circle{
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = Math.random()*4+2;
        this.color = color;
        this.vy = (Math.random() - 0.5)*8;
        this.vx = (Math.random() - 0.5)*8;
        this.gravity = 0.05;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
    }
}

canvas.addEventListener('click', (e) => {
    const colors = ['#ff4d4d', '#4dff4d', '#4d4dff', '#ffff4d', '#ff4dff', '#4dffff'];
    for (let i =0;i< 200; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        balls.push(new Circle(e.x, e.y, color));
    }
});
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach((ball, index) => {
        ball.update();
        ball.draw();    
        if (ball.radius > 0.2) ball.radius -= 0.1;
        else balls.splice(index, 1);
    });
    requestAnimationFrame(animate);
}
animate();