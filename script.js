const arena = document.querySelector('.arena');
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const score = document.getElementById('score');
const time = document.getElementById('time');
const end = document.getElementById('end');

let scorecount = 0;
let ballduration;
let countdown;
let colorchange;
let gameon = false;
function ballcreation(){
    const ball = document.createElement('div');
    ball.classList.add('ball' , 'blueball');

    const x = Math.random() * (arena.clientWidth - 70);
    let y = Math.random() * (arena.clientHeight - 70);
    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;
    arena.appendChild(ball);

    let vy = 0;
    const gravity = 0.5;
    const damping = 0.7;

    function animate() {
        vy += gravity;
        y += vy;
        if (y + 70 > arena.clientHeight) {
            y = arena.clientHeight - 70;
            vy = -vy * damping;
        }
        ball.style.top = `${y}px`;
        requestAnimationFrame(animate);
    }

    colorchange = setTimeout(() => {
        ball.classList.replace('blueball' , 'redball');
        animate();
        gamestatus();
    } , 2000);

    ball.addEventListener('click' , () => {
        if(gameon && ball.classList.contains('blueball')){
            scorecount++;
            score.textContent = `${scorecount}`;
            ball.remove();
            
        }
    });


}

function gamestatus(){
    const blueballs = document.querySelectorAll('.blueball').length;
    const all = document.querySelectorAll('.ball').length;
    if(all > 0 && blueballs === 0){
        endgame();
    }
}
function startgame(){
    gameon = true;
   start.style.display = 'none';
    reset.style.display = 'inline-block';
    score.textContent = '0';
    time.textContent = '30';
    end.style.display = 'none';
    ballduration = setInterval(() =>{
        ballcreation();
        gamestatus();
        }, 1000);
    

    let timeleft = 30;
    countdown = setInterval(() => {
        timeleft--;
        time.textContent = `${timeleft}`;
        if(timeleft <= 0){
            clearInterval(countdown);
            time.textContent = '0';
            endgame();
    } }, 1000);
}
function endgame(){
    gameon = false;
    clearInterval(ballduration);
    clearInterval(countdown);
    clearTimeout(colorchange);
    time.textContent = '0';
    end.innerHTML= `Game over !! your final score is ${score.textContent}` ;
    reset.style.display = 'inline-block';
    end.style.display = 'block';
}
function resetgame(){
    clearInterval(ballduration);
    clearInterval(countdown);
    clearTimeout(colorchange);
    arena.innerHTML = '';
    start.style.display = 'inline-block';
    reset.style.display = 'none';
    score.textContent = '0';
    time.textContent = '30';
    end.style.display = 'none';
}

start.addEventListener('click' , startgame);
reset.addEventListener('click' , resetgame);