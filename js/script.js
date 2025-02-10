/**
 * @file script.js
 * @fileoverview This script handles the initialization and gameplay mechanics for a web-based game.
 * It includes functions to generate the game field, manage player turns, and handle win conditions.
 * 
 * @module WebGameScript
 */

/**
 * @constant {HTMLCollection} whitePieces - Collection of elements representing the starting positions for white pieces.
 * @constant {HTMLCollection} blackPieces - Collection of elements representing the starting positions for black pieces.
 * @constant {HTMLCollection} BlackSquares - Collection of elements representing the black squares on the game board.
 * @constant {HTMLCollection} WhiteSquares - Collection of elements representing the white squares on the game board.
 * @constant {HTMLElement} player - Element displaying the current player's turn.
 * @constant {HTMLElement} generateButton - Button element to generate the game field.
 * @constant {HTMLElement} scoreWhite - Element displaying the score for the white player.
 * @constant {HTMLElement} scoreBlack - Element displaying the score for the black player.
 * @constant {NodeList} rowList - NodeList of all rows in the game table.
 * @constant {dam} game - Handles the game logic and state.
 */
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

const game = new dam()

// adds the event listener for filling the board to the button
generateButton.addEventListener("click", generateField)

/**
 * Generates the game field by placing pieces on their starting positions and setting up initial game state.
 * 
 * @function generateField
 * @returns {void}
 */
function generateField() {
    // empty variable so no errors
    let piece = null;
    // for loops running for all start positions
    for (let i = 0; i < whitePieces.length; i++) {
        // create the piece
        piece = new stone();
        console.log(piece instanceof stone)
        // set the image
        piece.src = 'assets/stone_white.png';
        // set the class
        piece.className = "White-Piece"
        // get the start position
        let whitePiece = whitePieces[i];
        // add's movement to the piece
        piece.addEventListener("click", piece.setUpWhite)
        // add the piece to the start position
        whitePiece.appendChild(piece)
        // set the start position to occupied
        whitePiece.classList.add("occupied")
    }
    for (let i = 0; i < blackPieces.length; i++) {
        // create the piece
        piece = new stone();
        console.log(piece instanceof stone)
        // set the image
        piece.src = 'assets/stone_black.png';
        // set the class
        piece.className = "Black-Piece"
        // get the start position
        let blackPiece = blackPieces[i];
        // add's movement to the piece
        piece.addEventListener("click", piece.setUpBlack)
        // add the piece to the start position
        blackPiece.appendChild(piece)
        // set the start position to occupied
        blackPiece.classList.add("occupied")
    }
    // randomly assign a first turn
    game._turn = Math.floor(Math.random() * 10) + 1 >= 5 ? "White" : "Black"
    // set it so pieces can move
    piece._possible = false;
    // show the turn in the website
    player.children[0].innerHTML = game.turn
    // disable the button
    generateButton.setAttribute('disabled', 'false');
}

/**
 * Alerts the winner of the game and updates the score. Resets the game board for a new round.
 * 
 * @function alertWin
 * @param {string} color - The color of the winning player ("White" or "Black").
 * @returns {void}
 */
function alertWin(color) {
    // empty variable for the score
    let score = 0;
    // checks if there the score is already set
    if (document.getElementById("round-win-" + color).innerHTML != null) {
        // get the score from the website
        score = document.getElementById("round-win-" + color).innerText;
        score++;
    }
    else {
        score = 1
    }
    // set the score in the website
    document.getElementById("round-win-" + color).innerHTML = score

    // enables the generate button
    generateButton.removeAttribute('disabled')
    // removes all pieces from the board
    for (let i = 0; i < WhiteSquares.length; i++) {
        // checks if there is a piece
        if (WhiteSquares[i] != null && WhiteSquares[i].children[0] != null) {
            console.log(WhiteSquares[i].children[0])
            // removes the piece
            WhiteSquares[i].children[0].remove();
        }
    }
    for (let i = 0; i < BlackSquares.length; i++) {
        // checks if there is a piece
        if (BlackSquares[i] != null && BlackSquares[i].children[0] != null) {
            console.log(BlackSquares[i])
            // removes the piece
            BlackSquares[i].children[0].remove();
        }
    }
}