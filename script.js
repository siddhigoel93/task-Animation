const arena = document.querySelector('.arena');
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const score = document.getElementById('score');
const time = document.getElementById('time');
const end = document.getElementById('end');

let scorecount = 0;
let ballduration;
let gameduration;
let countdown;

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
        gamestatus();
    } , 5000);

    ball.addEventListener('click' , () => {
        if(ball.classList.contains('blueball')){
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
        endgame("lose");
    }
}
function startgame(){
   start.style.display = 'none';
    reset.style.display = 'inline-block';
    score.textContent = '0';
    time.textContent = '30';
    end.style.display = 'none';
    ballduration = setInterval(() =>{
        ballcreation();
        gamestatus();
        }, 1500);
    gameduration = setTimeout(() => {
        endgame("win");
    }, 30000);

    let timeleft = 30;
    countdown = setInterval(() => {
        timeleft--;
        time.textContent = `${timeleft}`;
        if(timeleft <= 0){
            clearInterval(countdown);
            if(scorecount === 0){
                endgame("lose");
           }
           else{
            endgame("win");
           }
    } }, 1000);
}
function endgame(result){

    clearInterval(ballduration);
    clearTimeout(gameduration);
    clearInterval(countdown);
    arena.innerHTML = '';

    if(result === "lose"){
        end.innerHTML= `Game over !! your final score is ${score.textContent}` ;
    }
    else{
        end.innerHTML= `Congratulations !! Your score is ${score.textContent}` ;
    }
    start.style.display = 'inline-block';
    reset.style.display = 'none';
    end.style.display = 'block';
}
function resetgame(){
    clearInterval(ballduration);
    clearInterval(gameduration);
    arena.innerHTML = '';
    start.style.display = 'inline-block';
    reset.style.display = 'none';
    score.textContent = '0';
    time.textContent = '30';
    end.style.display = 'none';
}

start.addEventListener('click' , startgame);
reset.addEventListener('click' , resetgame);