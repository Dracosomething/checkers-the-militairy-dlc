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
var oldturn = piece._turn

function generateField() {
    for (let i = 0; i < whitePieces.length; i++) {
        let white = document.createElement('img');
        white.src = 'assets/stone-white.png';
        white.className = "White-Piece"
        let whitePiece = whitePieces[i];
        white.addEventListener("click", setUpWhite)
        whitePiece.appendChild(white)
        whitePiece.classList.add("occupied")
    }
    for (let i = 0; i < blackPieces.length; i++) {
        let black = document.createElement('img');
        black.src = 'assets/stone-black.png';
        black.className = "Black-Piece"
        let blackPiece = blackPieces[i];
        black.addEventListener("click", setUpBlack)
        blackPiece.appendChild(black)
        blackPiece.classList.add("occupied")
    }
    piece._turn = Math.floor(Math.random() * 10) + 1 >= 5 ? "White" : "Black"
    piece._possible = false;
    console.log(piece._possible)
    player.children[0].innerHTML = piece._turn
    generateButton.setAttribute('disabled', 'false');
}

function setUpBlack(event) {
    if (!piece._possible) {
        console.log(piece.possible)
        if (piece._turn == "Black") {
            const cell = event.target.closest('td');
            if (!cell) { return; }
            const row = cell.parentElement;

            var selected = document.getElementsByClassName("selected");
            if (selected.length != 0) {
                for (let i = 0; i <= selected.length; i++) {
                    selected[0].classList.remove("selected");
                }
            }

            var possibleSquares = document.getElementsByClassName("possible");
            if (possibleSquares.length != 0) {
                for (let i = 0; i <= possibleSquares.length; i++) {
                    possibleSquares[0].removeEventListener("click", piece.move);
                    possibleSquares[0].classList.remove("possible");
                }
            }

            var targets = document.getElementsByClassName("target");
            if (targets.length != 0) {
                for (let i = 0; i <= targets.length; i++) {
                    targets[0].classList.remove("target");
                }
            }

            var targetSquares = document.getElementsByClassName("target");
            let y = targetSquares.length;
            if (targetSquares.length != 0) {
                for (let i = 0; i < y; i++) {
                    targetSquares[0].removeEventListener("click", piece.move);
                    targetSquares[0].classList.remove("possible");
                }
            }
            if (rowList[row.rowIndex + 1] != null) {
                cellList = rowList[row.rowIndex + 1].cells;
                if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
                }
                cellList = rowList[row.rowIndex + 1].cells;
                if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
                }
            }
            if (rowList[row.rowIndex - 1] != null) {
                cellList = rowList[row.rowIndex - 1].cells;
                if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
                } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white")) {
                    if (!cellList[cell.cellIndex - 1].classList.contains("occupied")) {
                        cellList[cell.cellIndex - 1].classList.add("possible")
                        cellList[cell.cellIndex - 1].addEventListener("click", piece.move)
                    }
                }
                cellList = rowList[row.rowIndex - 1].cells;
                if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
                } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
                    if (!cellList[cell.cellIndex + 1].classList.contains("occupied")) {
                        cellList[cell.cellIndex + 1].classList.add("possible")
                        cellList[cell.cellIndex + 1].addEventListener("click", piece.move)
                    }
                }
            }
            event.target.classList.add("selected")
        }
    }
}

function setUpWhite(event) {
    if (!piece._possible) {
        console.log(piece.possible)
        if (piece._turn == "White") {
            const cell = event.target.closest('td');
            if (!cell) { return; }
            const row = cell.parentElement;

            var selected = document.getElementsByClassName("selected");
            if (selected.length != 0) {
                for (let i = 0; i <= selected.length; i++) {
                    selected[0].classList.remove("selected");
                }
            }

            var targets = document.getElementsByClassName("target");
            if (targets.length != 0) {
                for (let i = 0; i <= targets.length; i++) {
                    targets[0].classList.remove("target");
                }
            }

            var possibleSquares = document.getElementsByClassName("possible");
            let x = possibleSquares.length;
            if (possibleSquares.length != 0) {
                for (let i = 0; i < x; i++) {
                    possibleSquares[0].removeEventListener("click", piece.move);
                    possibleSquares[0].classList.remove("possible");
                }
            }

            var targetSquares = document.getElementsByClassName("target");
            let y = targetSquares.length;
            if (targetSquares.length != 0) {
                for (let i = 0; i < y; i++) {
                    targetSquares[0].removeEventListener("click", piece.move);
                    targetSquares[0].classList.remove("possible");
                }
            }

            if (rowList[row.rowIndex - 1] != null) {
                cellList = rowList[row.rowIndex - 1].cells;
                if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
                }
                cellList = rowList[row.rowIndex - 1].cells;
                if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
                }
            }
            if (rowList[row.rowIndex + 1] != null) {
                cellList = rowList[row.rowIndex + 1].cells;
                if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("black")) {
                } else if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("white")) {
                    if (!cellList[cell.cellIndex].classList.contains("occupied")) {
                        cellList[cell.cellIndex].classList.add("possible")
                        cellList[cell.cellIndex].addEventListener("click", piece.move)
                    }
                }
                if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
                } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
                    if (!cellList[cell.cellIndex + 1].classList.contains("occupied")) {
                        cellList[cell.cellIndex + 1].classList.add("possible")
                        cellList[cell.cellIndex + 1].addEventListener("click", piece.move)
                    }
                }
                cellList = rowList[row.rowIndex + 1].cells;
                if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
                } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white")) {
                    if (!cellList[cell.cellIndex - 1].classList.contains("occupied")) {
                        cellList[cell.cellIndex - 1].classList.add("possible")
                        cellList[cell.cellIndex - 1].addEventListener("click", piece.move)
                    }
                }
            }
            event.target.classList.add("selected")
        }
    }
}

function getTarget(index) {
    target = index;
    return target;
}

function alertWin(color){
    alert(color + " won")
}