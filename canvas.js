const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Circle{
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 20 + 10;
        this.color = color;
        this.vy = (Math.random() - 0.5) * 4;
        this.vx = (Math.random() - 0.5) * 4;
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
    }
}