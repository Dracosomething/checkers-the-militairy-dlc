var whitePieces = document.getElementsByClassName("startposWhite")
var blackPieces = document.getElementsByClassName("startposBlack")
var BlackSquares = document.getElementsByClassName("black")
var WhiteSquares = document.getElementsByClassName("white")

let player = document.getElementById("turn-show")
let generateButton = document.getElementById("generateButton")

const rowList = document.querySelectorAll("table tr")
var cellList;
var target;
const piece = new stone();

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
    player.children[0].innerHTML = turn
    generateButton.setAttribute('disabled', 'false');
}

function setUpBlack(event) {
    if (turn == "black") {
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
            } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied") && !cellList[cell.cellIndex - 1].children[0].classList.contains("Black-Piece")) {
                cellList = rowList[row.rowIndex + 2].cells;
                if (!cellList[cell.cellIndex - 2].classList.contains("occupied")) {
                    cellList[cell.cellIndex - 2].classList.add("possible")
                    cellList[cell.cellIndex - 2].addEventListener("click", function () {
                        switch (document.getElementsByClassName("target").length) {
                            case 2:
                                getTarget(1)
                                break;
                            case 3:
                                getTarget(1)
                                break;
                            case 4:
                                getTarget(1);
                                break;
                            case 1:
                                getTarget(0);
                                break;
                        }
                    })
                    cellList[cell.cellIndex - 2].addEventListener("click", piece.attack)
                    cellList = rowList[row.rowIndex + 1].cells
                    cellList[cell.cellIndex - 1].classList.add("target")
                }
            }
            cellList = rowList[row.rowIndex + 1].cells;
            if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && !cellList[cell.cellIndex + 1].children[0].classList.contains("Black-Piece")) {
                cellList = rowList[row.rowIndex + 2].cells;
                if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                    cellList[cell.cellIndex + 2].classList.add("possible")
                    cellList[cell.cellIndex + 2].addEventListener("click", function () {
                        switch (document.getElementsByClassName("target").length) {
                            case 2:
                                getTarget(0)
                                break;
                            case 3:
                                getTarget(0)
                                break;
                            case 4:
                                getTarget(0);
                                break;
                            case 1:
                                getTarget(0);
                                break;
                        }
                    })
                    cellList[cell.cellIndex + 2].addEventListener("click", piece.attack)
                    cellList = rowList[row.rowIndex + 1].cells;
                    cellList[cell.cellIndex + 1].classList.add("target")
                }
            }
        }
        if (rowList[row.rowIndex - 1] != null) {
            cellList = rowList[row.rowIndex - 1].cells;
            if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied") && !cellList[cell.cellIndex - 1].children[0].classList.contains("Black-Piece")) {
                cellList = rowList[row.rowIndex - 2].cells;
                if (!cellList[cell.cellIndex - 2].classList.contains("occupied")) {
                    cellList[cell.cellIndex - 2].classList.add("possible")
                    cellList[cell.cellIndex - 2].addEventListener("click", function () {
                        switch (document.getElementsByClassName("target").length) {
                            case 2:
                                getTarget(1)
                                break;
                            case 3:
                                getTarget(2)
                                break;
                            case 4:
                                getTarget(3);
                                break;
                            case 1:
                                getTarget(0);
                                break;
                        }
                    })
                    cellList[cell.cellIndex - 2].addEventListener("click", piece.attack)
                    cellList = rowList[row.rowIndex - 1].cells;
                    cellList[cell.cellIndex - 1].classList.add("target")
                }
            } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white")) {
                if (!cellList[cell.cellIndex - 1].classList.contains("occupied")) {
                    cellList[cell.cellIndex - 1].classList.add("possible")
                    cellList[cell.cellIndex - 1].addEventListener("click", piece.move)
                }
            }
            cellList = rowList[row.rowIndex - 1].cells;
            if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && !cellList[cell.cellIndex + 1].children[0].classList.contains("Black-Piece")) {
                cellList = rowList[row.rowIndex - 2].cells;
                if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                    cellList[cell.cellIndex + 2].classList.add("possible")
                    cellList[cell.cellIndex + 2].addEventListener("click", function () {
                        switch (document.getElementsByClassName("target").length) {
                            case 2:
                                getTarget(1)
                                break;
                            case 3:
                                getTarget(2)
                                break;
                            case 4:
                                getTarget(2);
                                break;
                            case 1:
                                getTarget(0);
                                break;
                        }
                    })
                    cellList[cell.cellIndex + 2].addEventListener("click", piece.attack)
                    cellList = rowList[row.rowIndex - 1].cells;
                    cellList[cell.cellIndex + 1].classList.add("target")
                }
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

function setUpWhite(event) {
    if (turn == "white") {
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
            } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && !cellList[cell.cellIndex + 1].children[0].classList.contains("White-Piece")) {
                cellList = rowList[row.rowIndex - 2].cells;
                if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                    cellList[cell.cellIndex + 2].classList.add("possible")
                    cellList[cell.cellIndex + 2].addEventListener("click", function () {
                        switch (document.getElementsByClassName("target").length) {
                            case 2:
                                getTarget(1)
                                break;
                            case 3:
                                getTarget(1)
                                break;
                            case 4:
                                getTarget(1);
                                break;
                            case 1:
                                getTarget(0);
                                break;
                        }
                    })
                    cellList[cell.cellIndex + 2].addEventListener("click", piece.attack)
                    cellList = rowList[row.rowIndex - 1].cells
                    cellList[cell.cellIndex + 1].classList.add("target")
                }
            }
            cellList = rowList[row.rowIndex - 1].cells;
            if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied") && !cellList[cell.cellIndex - 1].children[0].classList.contains("White-Piece")) {
                cellList = rowList[row.rowIndex - 2].cells;
                if (!cellList[cell.cellIndex - 2].classList.contains("occupied")) {
                    cellList[cell.cellIndex - 2].classList.add("possible")
                    cellList[cell.cellIndex - 2].addEventListener("click", function () {
                        switch (document.getElementsByClassName("target").length) {
                            case 2:
                                getTarget(0)
                                break;
                            case 3:
                                getTarget(0)
                                break;
                            case 4:
                                getTarget(0);
                                break;
                            case 1:
                                getTarget(0);
                                break;
                        }
                    })
                    cellList[cell.cellIndex - 2].addEventListener("click", piece.attack)
                    cellList = rowList[row.rowIndex - 1].cells;
                    cellList[cell.cellIndex - 1].classList.add("target")
                }
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
            } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && !cellList[cell.cellIndex + 1].children[0].classList.contains("White-Piece")) {
                cellList = rowList[row.rowIndex + 2].cells;
                if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                    cellList[cell.cellIndex + 2].classList.add("possible")
                    cellList[cell.cellIndex + 2].addEventListener("click", function () {
                        switch (document.getElementsByClassName("target").length) {
                            case 2:
                                getTarget(1)
                                break;
                            case 3:
                                getTarget(2)
                                break;
                            case 4:
                                getTarget(2);
                                break;
                            case 1:
                                getTarget(0);
                                break;
                        }
                    })
                    cellList[cell.cellIndex + 2].addEventListener("click", piece.attack)
                    cellList = rowList[row.rowIndex + 1].cells;
                    cellList[cell.cellIndex + 1].classList.add("target")
                }
            } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
                if (!cellList[cell.cellIndex + 1].classList.contains("occupied")) {
                    cellList[cell.cellIndex + 1].classList.add("possible")
                    cellList[cell.cellIndex + 1].addEventListener("click", piece.move)
                }
            }
            cellList = rowList[row.rowIndex + 1].cells;
            if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied") && !cellList[cell.cellIndex - 1].children[0].classList.contains("White-Piece")) {
                cellList = rowList[row.rowIndex + 2].cells;
                if (!cellList[cell.cellIndex - 2].classList.contains("occupied")) {
                    cellList[cell.cellIndex - 2].classList.add("possible")
                    cellList[cell.cellIndex - 2].addEventListener("click", function () {
                        switch (document.getElementsByClassName("target").length) {
                            case 2:
                                getTarget(1)
                                break;
                            case 3:
                                getTarget(2)
                                break;
                            case 4:
                                getTarget(3);
                                break;
                            case 1:
                                getTarget(0);
                                break;
                        }
                    })
                    cellList[cell.cellIndex - 2].addEventListener("click", piece.attack)
                    cellList = rowList[row.rowIndex + 1].cells;
                    cellList[cell.cellIndex - 1].classList.add("target")
                }
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

function getTarget(index) {
    target = index;
    return target;
}