const arena = document.querySelector('.arena');
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const score = document.getElementById('score');
const time = document.getElementById('time');
const end = document.getElementById('end');
const fscore = document.getElementById('fscore');

function ballcreation(){
    const ball = document.createElement('div');
    ball.classList.add('ball' , 'blueball');

    const x = Math.random() * (arena.clientWidth - 30);
    const y = Math.random() * (arena.clientHeight - 30);
    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;
    arena.appendChild(ball);

    setTimeout(() => {
        ball.classList.replace('blueball' , 'redball');
    } , 5000);
    ball.addEventListener('click' , () => {
        if(ball.classList.contains('blueball')){
            ball.remove();
        }
    });

    
}