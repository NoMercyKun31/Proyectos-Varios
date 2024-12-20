const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

function game() {
    update();
    render();
    requestAnimationFrame(game);
}
requestAnimationFrame(game);

let player1 = {
    x: 10,
    y: 220,
    dy: 5,
}

let player2 = {
    x: 570, 
    y: 220,
    dy: 5,
} 

let ball = {
    x: 300,
    y: 250,
    dx: 7,
    dy: 2,
    radius: 10,
}

let player1Score = 0;
let player2Score = 0;

let player1Direction = "";
let player2Direction = "";

document.addEventListener('keydown', (e) => {
    if (e.keyCode === 83) {
        player1Direction = 'down';
    } else if (e.keyCode === 87) {
        player1Direction = 'up';
    } else if (e.keyCode === 40) { 
        player2Direction = 'down';
    } else if (e.keyCode === 38) { 
        player2Direction = 'up';
    }
});

document.addEventListener('keyup', (e) => {
    if (e.keyCode === 83 || e.keyCode === 87) {
        player1Direction = '';
    } else if (e.keyCode === 40 || e.keyCode === 38) {
        player2Direction = '';
    }
});

function update() {
    movePlayer();
    moveBall();
    checkCollision();
    updateScore();
}

function movePlayer() {
    if (player1Direction === 'up') {
        player1.y -= player1.dy;
    } else if (player1Direction === 'down') {
        player1.y += player1.dy;
    }

    if (player2Direction === 'up') {
        player2.y -= player2.dy;
    } else if (player2Direction === 'down') {
        player2.y += player2.dy;
    }
}

function checkCollision() {
    if(player1.y <= 0) {
        player1.y = 0;
    } else if (player1.y + 60 >= 500) {
        player1.y = 440;
    }

    if(player2.y <= 0){
        player2.y = 0;
    } else if (player2.y + 60 >= 500) {
        player2.y = 440;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
        ball.dx = -ball.dx;
    }
    if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
        ball.dy = -ball.dy;
    }

    if (
        ball.x - ball.radius <= player1.x + 20 && 
        ball.y >= player1.y - ball.radius && 
        ball.y <= player1.y + 60 + ball.radius
    ) {
        ball.dx = -ball.dx;
    }

    if (
        ball.x + ball.radius >= player2.x && 
        ball.y >= player2.y - ball.radius && 
        ball.y <= player2.y + 60 + ball.radius 
    ) {
        ball.dx = -ball.dx;
    }
}



function updateScore(){
    if(ball.x - ball.radius <= 0) player2Score += 1;
    if(ball.x + ball.radius >= canvas.width) player1Score += 1;

    if (player1Score >= 5 || player2Score >= 5) {
        let winner = player1Score >= 5 ? "Jugador 1" : "Jugador 2";
        alert(winner + " ha ganado!");

        resetGame();
    }
}

function resetGame() {
    player1Score = 0;
    player2Score = 0;

    player1.x = 10;
    player1.y = 220;
    player2.x = 570;
    player2.y = 220;
    ball.x = 300;
    ball.y = 250;

    ball.dx = Math.random() > 0.5 ? 7 : -7;
    ball.dy = Math.random() > 0.5 ? 2 : -2; 
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();

    context.rect(player1.x, player1.y, 20, 60);
    context.rect(player2.x, player2.y, 20, 60);

    context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);

    context.fillStyle = '#423652';

    context.font = '35px Arial';
    context.fillText(player1Score, 30, 50);
    context.fillText(player2Score, 550, 50);

    context.fill();
    context.closePath();
}
