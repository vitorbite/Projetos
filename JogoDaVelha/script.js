let cells = document.querySelectorAll('.data');
const board = document.querySelector('table');
let gameIsOn = true;
let finalScreen = document.getElementById('Final');
const audio = document.querySelector('audio');
let frase = document.querySelector('h3')
const restartButton = document.querySelector('button#restart');
let Player1;
let bot;


restartButton.addEventListener('click', () => {
    gameIsOn = true;
    finalScreen.style.display = 'none';
    board.classList.remove('board')
    Player1 = true;
    resetBoard();
})


function resetBoard() {
    cells.forEach(cell => {
        cell.classList.remove('marked');
        cell.innerHTML = '';
    });
}

function Start() {
    let select = document.querySelector('select');
    bot = select.value == 'bot' ? true : false;
    Player1 = true;
    document.addEventListener('click', CellClick);

function CellClick(e) {
        if (!gameIsOn) return;
        let el = e.target;
        if ((el.classList.contains('data')) && (Player1 || !bot)) {
            if (!cells[el.id].classList.contains('marked')) {
                cells[el.id].classList.add('marked');
                cells[el.id].innerHTML = Player1 ? 'X' : 'O';
                Player1 = !Player1;
                checkWin();
                if (bot && gameIsOn && ! Player1) setTimeout(botMove, 1000);
            }
        }

    }

}
function botMove() {
    let availableCells = Array.from(cells).filter(cell => !cell.classList.contains('marked'));
    if (availableCells.length > 0) {
        let randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        randomCell.classList.add('marked');
        randomCell.innerHTML = 'O';
        Player1 = !Player1;
        checkWin();
    }
}

function checkWin() {
    let win = [
        [cells[0], cells[1], cells[2]],
        [cells[3], cells[4], cells[5]],
        [cells[6], cells[7], cells[8]],
        [cells[0], cells[3], cells[6]],
        [cells[1], cells[4], cells[7]],
        [cells[2], cells[5], cells[8]],
        [cells[0], cells[4], cells[8]],
        [cells[2], cells[4], cells[6]]
    ];

    let winner = null;
    win.forEach((pattern, index) => {
        if (pattern.every(e => e.innerHTML === 'X')) {
            winner = 'X';
            positionWinBar(index);
            gameIsOn = false
            setTimeout(() => {
                finalScreen.style.display = 'flex'
                audio.play();
                frase.innerHTML = 'Player1 Wins!!!'
            }, 1000)
        };
    })
    win.forEach((pattern, index) => {
        if (pattern.every(e => e.innerHTML === 'O')) {
            winner = 'O'
            positionWinBar(index);
            gameIsOn = false
            setTimeout(() => {
                finalScreen.style.display = 'flex'
                audio.play();
                if (bot) frase.innerHTML = 'Bot Wins!!'
                if (!bot) frase.innerHTML = 'Player2 Wins!!!'
            }, 1000)
        };
    })

    if (!winner && [...cells].every(cell => cell.innerHTML !== '')) {
        gameIsOn = false;
        setTimeout(() => {
            finalScreen.style.display = 'flex'
            frase.innerHTML = 'Tie!!'
        }, 1000)

    }
    function positionWinBar(index) {
        const positions = [
            { top: '15%', height: '13px', width: '112%' },
            { top: '49%', height: '13px', width: '112%' },
            { top: '82%', height: '13px', width: '112%' },
            { height: '112%', left: '15%', width: '13px' },
            { height: '112%', left: '49%', width: '13px' },
            { height: '112%', left: '82%', width: '13px' },
            { transform: 'rotate(45deg)', width: '112%', height: '13px' },
            { transform: 'rotate(-45deg)', width: '112%', height: '13px' },
        ]
        const pos = positions[index];
        board.style.setProperty('--win-bar-top', pos.top);
        board.style.setProperty('--win-bar-left', pos.left);
        board.style.setProperty('--win-bar-transform', pos.transform || 'none');
        board.style.setProperty('--win-bar-width', pos.width)
        board.style.setProperty('--win-bar-height', pos.height)
        board.classList.add('board');

    }
}