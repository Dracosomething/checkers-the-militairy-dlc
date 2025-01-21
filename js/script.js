// start positions
var whitePieces = document.getElementsByClassName("startposWhite")
var blackPieces = document.getElementsByClassName("startposBlack")
// squares
var BlackSquares = document.getElementsByClassName("black")
var WhiteSquares = document.getElementsByClassName("white")

// show turn and button
let player = document.getElementById("turn-show")
let generateButton = document.getElementById("generateButton")

// score board for white and black
let scoreWhite = document.getElementById("score-white")
let scoreBlack = document.getElementById("score-black")

// all rows in the table
const rowList = document.querySelectorAll("table tr")

// empty variables;
var cellList;
var target;
var win;

// create classes
const piece = new stone();
const dam_piece = new dam()

import { stone } from "./stone.js"
import { dam } from "./dam.js"

export { rowList, player, piece, dam_piece, win, scoreBlack, scoreWhite, alertWin }

// the previous turn
var oldturn = piece._turn

generateButton.addEventListener("click", generateField)

// fill the board with pieces
function generateField() {
    // for loops running for all start positions
    for (let i = 0; i < whitePieces.length; i++) {
        // create the piece
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
    // randomly assign a first turn
    piece._turn = Math.floor(Math.random() * 10) + 1 >= 5 ? "White" : "Black"
    // set it so pieces can move
    piece._possible = false;
    // show the turn in the website
    player.children[0].innerHTML = piece._turn
    // disable the button
    generateButton.setAttribute('disabled', 'false');
}


function getTarget(index) {
    target = index;
    return target;
}

// win alert
function alertWin(color) {
    let numb
    if (document.getElementById("round-win-" + color).innerHTML != null) {
        numb = document.getElementById("round-win-" + color).innerText;
        numb++;
    }
    else {
        numb = 1
    }
    document.getElementById("round-win-" + color).innerHTML = numb

    generateButton.removeAttribute('disabled')
    for (let i = 0; i < WhiteSquares.length; i++) {
        if (WhiteSquares[i] != null && WhiteSquares[i].children[0] != null) {
            console.log(WhiteSquares[i].children[0])
            WhiteSquares[i].children[0].remove();
        }
    }
    for (let i = 0; i < BlackSquares.length; i++) {
        if (BlackSquares[i] != null && BlackSquares[i].children[0] != null) {
            console.log(BlackSquares[i])
            BlackSquares[i].children[0].remove();
        }
    }
}