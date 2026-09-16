const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreValue = document.getElementById('score-value');
const finalScore = document.getElementById('final-score');
const bgMusic = document.getElementById('bg-music');
const startScreen = document.getElementById('start-screen');
const gameoverScreen = document.getElementById('gameover-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

let score = 0;
let gameOver = true;
let gameStarted = false;
let loop;
let scoreLoop;

bgMusic.volume = 0.4;

const jump = () => {
  if (gameOver || !gameStarted) return;

  mario.classList.add('jump');

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);
}

function resetGame() {
  score = 0;
  scoreValue.textContent = 0;
  gameOver = false;

  mario.src = './images/mario.gif';
  mario.style.width = '150px';
  mario.style.marginLeft = '0';
  mario.style.animation = '';
  mario.style.bottom = '60px';

  pipe.style.animation = 'pipe-animation 2s infinite linear';
  pipe.style.left = '';

  gameoverScreen.classList.add('hidden');
}

function startLoops() {
  scoreLoop = setInterval(() => {
    if (gameOver) return;
    score++;
    scoreValue.textContent = score;
  }, 100);

  loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 140) {

      pipe.style.animation = 'none';
      pipe.style.left = `${pipePosition}px`;

      mario.style.animation = 'none';
      mario.style.bottom = `${marioPosition}px`;

      mario.src = './images/game-over.png';
      mario.style.width = '75px';
      mario.style.marginLeft = '50px';
      mario.style.bottom = `${marioPosition + 29}px`;

      gameOver = true;
      bgMusic.pause();
      clearInterval(loop);
      clearInterval(scoreLoop);

      finalScore.textContent = score;
      gameoverScreen.classList.remove('hidden');
    }

  }, 10);
}

startBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  gameStarted = true;
  resetGame();
  bgMusic.currentTime = 0;
  bgMusic.play();
  startLoops();
});

restartBtn.addEventListener('click', () => {
  resetGame();
  bgMusic.currentTime = 0;
  bgMusic.play();
  startLoops();
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') e.preventDefault();
  jump();
});