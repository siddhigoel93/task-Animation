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
            scoreupdation();
        }
    });


}

function scoreupdation(){
     const blueballs = document.querySelectorAll('.blueball').length;
     score.textContent = `${blueballs}`;
}

function status(){
    const blueballs = document.querySelectorAll('.blueball').length;
    const all = document.querySelectorAll('.ball').length;
    if(all > 0 && blueballs === 0){
        endgame("lose");
    }
}
function startgame(){
   start.style.display = 'none';
    reset.style.display = 'inline-block';
    score.textContent = '0';
    time.textContent = '30';
    end.style.display = 'none';
    const ballduration = setInterval(ballcreation , 1500);
    const gameduration = setInterval(() => {
        endgame("win");
    }, 30000);

    let timeleft = 30;
    const countdown = setInterval(() => {
        timeleft--;
        time.textContent = `${timeleft}`;
        status();
        if(timeleft <= 0){
            clearInterval(countdown);
            clearInterval(ballduration);
            clearInterval(gameduration);
        }
    } , 1000);
}

start.addEventListener('click' , startgame);
