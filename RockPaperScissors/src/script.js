let res = document.getElementById('res');
const button = document.getElementById('Confirm');
const maos = ['✌', '🖐', '✊'];
let tesoura = document.getElementById('tes');
let papel = document.getElementById('papel');
let pedra = document.getElementById('pedra');
let emoji = document.getElementById('emoji');
let gameIsOn = true;
let hand;
let num;

function removeClass() {
    emoji.classList.remove('emoji');
    res.innerText = '---';
}

function random() {
    return Math.floor(Math.random() * 3);
}

function Check() {
    if (!gameIsOn) return;
    removeClass();
    document.getElementById('box').style.border = '2px solid black'
    gameIsOn = false;
    num = random();
    emoji.innerText = '✊';
    setTimeout(() => {
        emoji.classList.add('emoji');
        setTimeout(() => {
            emoji.innerText = maos[num];
            if (maos[num] === hand) {
                res.innerText = 'It\'s a Tie!';
            } else if (
                (hand === '✌' && maos[num] === '🖐') ||
                (hand === '🖐' && maos[num] === '✊') ||
                (hand === '✊' && maos[num] === '✌')
            ) {
                res.innerText = 'You Win!';
            } else {
                res.innerText = 'You Lose 😞';
            }
            gameIsOn = true;
        }, 2150);
    }, 100);
}

function Scissors() {
    if (!gameIsOn) return;
    hand = '✌';
    resetBorders();
    tesoura.style.border = 'solid 2px darkred';
    button.removeEventListener('click', Check);
    button.addEventListener('click', Check);
}

function Paper() {
    if (!gameIsOn) return;
    hand = '🖐';
    resetBorders();
    papel.style.border = 'solid 2px darkred';
    button.removeEventListener('click', Check);
    button.addEventListener('click', Check);
}

function Rock() {
    if (!gameIsOn) return;
    hand = '✊';
    resetBorders();
    pedra.style.border = 'solid 2px darkred';
    button.removeEventListener('click', Check);
    button.addEventListener('click', Check);
}

function resetBorders() {
    tesoura.style.border = 'solid 1px black';
    papel.style.border = 'solid 1px black';
    pedra.style.border = 'solid 1px black';
}
