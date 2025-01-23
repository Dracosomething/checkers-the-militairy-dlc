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

// create classes
const game = new dam()

generateButton.addEventListener("click", generateField)

// fill the board with pieces
function generateField() {
    let piece;
    // for loops running for all start positions
    for (let i = 0; i < whitePieces.length; i++) {
        // create the piece
        piece = new stone();
        console.log(piece instanceof stone)
        piece.src = 'assets/stone_white.png';
        piece.className = "White-Piece"
        let whitePiece = whitePieces[i];
        piece.addEventListener("click", piece.setUpWhite)
        whitePiece.appendChild(piece)
        whitePiece.classList.add("occupied")
    }
    for (let i = 0; i < blackPieces.length; i++) {
        piece = new dam();
        console.log(piece instanceof dam)
        piece.src = 'assets/stone_black.png';
        piece.className = "dam Black-Piece"
        let blackPiece = blackPieces[i];
        piece.addEventListener("click", piece.setUpBlack)
        blackPiece.appendChild(piece)
        blackPiece.classList.add("occupied")
    }
    // randomly assign a first turn
    game._turn = Math.floor(Math.random() * 10) + 1 >= 5 ? "White" : "Black"
    // set it so pieces can move
    piece._possible = false;
    // show the turn in the website
    player.children[0].innerHTML = game._turn
    // disable the button
    generateButton.setAttribute('disabled', 'false');
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