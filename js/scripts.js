/* -+-+-+---------------------------------+-+-+-
GAME OBJECT
-+-+-+---------------------------------+-+-+- */

function Game() {
    this.bodyEl = document.getElementById('body');
    this.boardContainer = document.getElementById('board');
    this.startScreen = this.createStartScreen();
}

Game.prototype.createStartScreen = function() {
    const startScreenContainer = document.createElement('div');
    const startScreenHeader = document.createElement('header');
    const startScreenH1 = document.createElement('h1');
    const startScreenLink = document.createElement('a');

    startScreenContainer.className = 'screen screen-start';
    startScreenContainer.id = 'start';
    startScreenH1.innerHTML = 'Tic Tac Toe';
    startScreenLink.href = '#';
    startScreenLink.className = 'button';
    startScreenLink.innerHTML = 'Start game';
    startScreenLink.addEventListener('click', this.startGame.bind(this), true);

    startScreenHeader.appendChild(startScreenH1);
    startScreenHeader.appendChild(startScreenLink);
    startScreenContainer.appendChild(startScreenHeader);
    return startScreenContainer;
};

Game.prototype.displayStartScreen = function() {
    this.boardContainer.style.display = 'none';
    this.bodyEl.appendChild(this.startScreen);
};

Game.prototype.removeStartScreen = function() {
    this.startScreen.remove();
};

Game.prototype.startGame = function() {
    this.removeStartScreen();
    this.boardContainer.style.display = 'block';
};

/* -+-+-+---------------------------------+-+-+-
BOARD OBJECT
-+-+-+---------------------------------+-+-+- */

function Board(player1, player2) {
    this.currentPlayer = player1;
    this.player1El = document.getElementById('player1');
    this.player2El = document.getElementById('player2');
    this.player1El.className = 'players active';
    this.availableSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
}

Board.prototype.clear = function() {
    const boxes = document.getElementsByClassName('box');
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].className = 'box';
    }
};

Board.prototype.equip = function() {
    const boxes = document.getElementsByClassName('box');

    for (let j = 0; j < boxes.length; j++) {
        boxes[j].addEventListener('click', function clickListener() {
            if (this.currentPlayer === player1) {
                boxes[j].style.backgroundImage = 'url(img/o.svg)';
                boxes[j].className = 'box box-filled-1';


            } else {
                boxes[j].style.backgroundImage = 'url(img/x.svg)';
                boxes[j].className = 'box box-filled-2';
            }
            console.log(this.availableSquares);
            this.turn();
        }.bind(this));

        boxes[j].addEventListener('mouseover', function mouseOverListener() {
            if (this.currentPlayer === player1 && !(boxes[j].className === 'box box-filled-1')) {
                boxes[j].style.backgroundImage = 'url(img/o.svg)';

            } else if (this.currentPlayer === player2 && !(boxes[j].className === 'box box-filled-2')) {
                boxes[j].style.backgroundImage = 'url(img/x.svg)';

            }
        }.bind(this));

        boxes[j].addEventListener('mouseout', function mouseOutListener() {
            if (!(boxes[j].className === 'box box-filled-1') && !(boxes[j].className === 'box box-filled-2')) {
                boxes[j].style.backgroundImage = 'none';
            }
        });
    }
};

Board.prototype.turn = function() {
    if (this.currentPlayer === player1) {
        this.currentPlayer = player2;
        this.player2El.className = 'players active';
        this.player1El.className = 'players';
    } else {
        this.currentPlayer = player1;
        this.player1El.className = 'players active';
        this.player2El.className = 'players';
    }
};

/* -+-+-+---------------------------------+-+-+-
PLAYER OBJECT
-+-+-+---------------------------------+-+-+- */

function Player() {}

/* -+-+-+---------------------------------+-+-+-
GAME PLAY
-+-+-+---------------------------------+-+-+- */

const game = new Game();
const player1 = new Player();
const player2 = new Player();
const board = new Board(player1, player2);
game.displayStartScreen();
board.clear();
board.equip();