var whitePieces = document.getElementsByClassName("startposWhite")
var blackPieces = document.getElementsByClassName("startposBlack")
var BlackSquares = document.getElementsByClassName("black")
var WhiteSquares = document.getElementsByClassName("white")

let player = document.getElementById("turn-show")
let generateButton = document.getElementById("generateButton")

let scoreWhite = document.getElementById("score-white")
let scoreBlack = document.getElementById("score-black")

const rowList = document.querySelectorAll("table tr")

var cellList;
var target;
var win;

const piece = new stone();
const dam_piece = new dam()
var oldturn = piece._turn

function generateField() {
    for (let i = 0; i < whitePieces.length; i++) {
        let white = document.createElement('img');
        white.src = 'assets/stone_white.png';
        white.className = "White-Piece"
        let whitePiece = whitePieces[i];
        white.addEventListener("click", piece.setUpWhite)
        whitePiece.appendChild(white)
        whitePiece.classList.add("occupied")
    }
    for (let i = 0; i < blackPieces.length; i++) {
        let black = document.createElement('img');
        black.src = 'assets/stone_black.png';
        black.className = "Black-Piece"
        let blackPiece = blackPieces[i];
        black.addEventListener("click", piece.setUpBlack)
        blackPiece.appendChild(black)
        blackPiece.classList.add("occupied")
    }
    piece._turn = Math.floor(Math.random() * 10) + 1 >= 5 ? "White" : "Black"
    piece._possible = false;
    player.children[0].innerHTML = piece._turn
    generateButton.setAttribute('disabled', 'false');
}


function getTarget(index) {
    target = index;
    return target;
}

function alertWin(color){
    alert(color + " won")
}