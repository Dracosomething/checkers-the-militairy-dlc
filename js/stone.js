var turn;
var BlackPieces = document.getElementsByClassName("Black-Piece")
var WhitePieces = document.getElementsByClassName("White-Piece")

class stone {
    constructor() { }

    kill_counter;

    possible;

    target;

    get _possible() {
        return piece.possible;
    }

    set _possible(possible) {
        piece.possible = possible
    }

    get _turn() {
        return turn;
    }
    set _turn(side) {
        turn = side
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

        var targetSquares = document.getElementsByClassName("target");
        let y = targetSquares.length;
        if (targetSquares.length != 0) {
            for (let i = 0; i < y; i++) {
                targetSquares[0].removeEventListener("click", piece.move);
                targetSquares[0].classList.remove("possible");
            }
        }

        var targets = document.getElementsByClassName("target");
        if (targets.length != 0) {
            for (let i = 0; i <= targets.length; i++) {
                targets[0].classList.remove("target");
            }
        }
        if (piece._possible) {
            piece._possible = !piece.possible
        }
        switch (piece._turn) {
            case "Black":
                if (BlackPieces.length <= 0) {
                    alertWin("white")
                }
                for (let j = 0; j < BlackPieces.length; j++) {
                    let stone = BlackPieces[j]
                    piece.forceAttack(stone, "White")
                }
                break
            case "White":
                if (WhitePieces.length <= 0) {
                    alertWin("black")
                }
                for (let j = 0; j < WhitePieces.length; j++) {
                    let stone = WhitePieces[j]
                    piece.forceAttack(stone, "Black")
                }
                break
        }
        piece.kill_counter = 0; 
    }

    move(event) {
        document.getElementsByClassName("selected")[0].parentElement.classList.remove("occupied")
        event.target.appendChild(document.getElementsByClassName("selected")[0])
        event.target.classList.add("occupied")
        var possibleSquares = document.getElementsByClassName("possible");
        let x = possibleSquares.length;
        if (possibleSquares.length != 0) {
            for (let i = 0; i < x; i++) {
                possibleSquares[0].removeEventListener("click", piece.move);
                possibleSquares[0].classList.remove("possible");
            }
        }
        piece._turn = piece._turn == "Black" ? "White" : "Black"
        player.children[0].innerHTML = piece._turn
    }

    attack(target, newSquare) {
        document.getElementsByClassName("selected")[0].parentElement.classList.remove("occupied")
        newSquare.appendChild(document.getElementsByClassName("selected")[0])
        newSquare.classList.add("occupied")
        var possibleSquares = document.getElementsByClassName("possible");
        target.parentElement.classList.remove("occupied")
        target.remove()
        let x = possibleSquares.length;
        if (possibleSquares.length != 0) {
            for (let i = 0; i < x; i++) {
                if (
                    possibleSquares[0].removeEventListener("click", piece.BottomLeft) ||
                    possibleSquares[0].removeEventListener("click", piece.BottomRight) ||
                    possibleSquares[0].removeEventListener("click", piece.TopLeft) ||
                    possibleSquares[0].removeEventListener("click", piece.TopRight)
                ) {

                }
                possibleSquares[0].classList.remove("possible");
            }
        }
        switch (piece._turn) {
            case "black":
                let white = document.createElement('img');
                white.src = 'assets/stone-white.png';
                white.className = "score_counter"
                scoreBlack.appendChild(white)
                break
            case "white":
                let black = document.createElement('img');
                black.src = 'assets/stone-black.png';
                black.className = "score_counter"
                scoreWhite.appendChild(black)
                break
        }
        piece.kill_counter += 1;
        piece.forceAttack(document.getElementsByClassName("selected")[0], turn == "Black" ? "White" : "Black")
        if (piece._possible) {
            piece._possible = !piece.possible
        } else {
            piece._turn = turn == "Black" ? "White" : "Black"
            player.children[0].innerHTML = piece._turn
        }
    }

    TopLeft(event) {
        let target = event.target
        const cell = target.closest("td")
        if (!cell) { return; }
        const row = cell.parentElement;
        let newSquare = rowList[row.rowIndex + 1].cells[cell.cellIndex - 1]
        piece.attack(target, newSquare)
    }

    TopRight(event) {
        let target = event.target
        const cell = target.closest("td")
        if (!cell) { return; }
        const row = cell.parentElement;
        let newSquare = rowList[row.rowIndex + 1].cells[cell.cellIndex + 1]
        piece.attack(target, newSquare)
    }

    BottomRight(event) {
        let target = event.target
        const cell = target.closest("td")
        if (!cell) { return; }
        const row = cell.parentElement;
        let newSquare = rowList[row.rowIndex - 1].cells[cell.cellIndex + 1]
        piece.attack(target, newSquare)
    }

    BottomLeft(event) {
        let target = event.target
        const cell = target.closest("td")
        if (!cell) { return; }
        const row = cell.parentElement;
        let newSquare = rowList[row.rowIndex - 1].cells[cell.cellIndex - 1]
        piece.attack(target, newSquare)
    }

    attackCheck(event) {
        let stone = event.target
        let opposing = piece._turn;
        console.log(piece._turn)
        const cell = stone.closest('td');
        if (!cell) { return; }
        const row = cell.parentElement;

        if (rowList[row.rowIndex + 1] != null) {
            cellList = rowList[row.rowIndex + 1].cells;
            if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex - 2] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied") && !cellList[cell.cellIndex - 1].children[0].classList.contains(opposing + "-Piece")) {
                cellList = rowList[row.rowIndex + 2].cells;
                if (!cellList[cell.cellIndex - 2].classList.contains("occupied")) {
                    cellList = rowList[row.rowIndex + 1].cells
                    cellList[cell.cellIndex - 1].addEventListener("click", piece.TopLeft)
                    cellList[cell.cellIndex - 1].classList.add("target")
                    cellList[cell.cellIndex - 1].classList.add("possible")
                    stone.classList.add("selected")
                    piece._possible = true
                }
            }
            cellList = rowList[row.rowIndex + 1].cells;
            if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex + 2] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && !cellList[cell.cellIndex + 1].children[0].classList.contains(opposing + "-Piece")) {
                cellList = rowList[row.rowIndex + 2].cells;
                if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                    cellList = rowList[row.rowIndex + 1].cells;
                    cellList[cell.cellIndex + 1].addEventListener("click", piece.TopRight)
                    cellList[cell.cellIndex + 1].classList.add("target")
                    cellList[cell.cellIndex + 1].classList.add("possible")
                    stone.classList.add("selected")
                    piece._possible = true
                }
            }
        }
        if (rowList[row.rowIndex - 1] != null) {
            cellList = rowList[row.rowIndex - 1].cells;
            if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex - 2] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied") && !cellList[cell.cellIndex - 1].children[0].classList.contains(opposing + "-Piece")) {
                cellList = rowList[row.rowIndex - 2].cells;
                if (!cellList[cell.cellIndex - 2].classList.contains("occupied")) {
                    cellList = rowList[row.rowIndex - 1].cells;
                    cellList[cell.cellIndex - 1].addEventListener("click", piece.BottomLeft)
                    cellList[cell.cellIndex - 1].classList.add("target")
                    cellList[cell.cellIndex - 1].classList.add("possible")
                    stone.classList.add("selected")
                    piece._possible = true
                }
            }
            cellList = rowList[row.rowIndex - 1].cells;
            if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex + 2] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && !cellList[cell.cellIndex + 1].children[0].classList.contains(opposing + "-Piece")) {
                cellList = rowList[row.rowIndex - 2].cells;
                if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                    cellList = rowList[row.rowIndex - 1].cells;
                    cellList[cell.cellIndex + 1].addEventListener("click", piece.BottomRight)
                    cellList[cell.cellIndex + 1].classList.add("target")
                    cellList[cell.cellIndex + 1].classList.add("possible")
                    stone.classList.add("selected")
                    piece._possible = true
                }
            }
        }
    }

    forceAttack(stone, opposing) {
        const cell = stone.closest('td');
        if (!cell) { return; }
        const row = cell.parentElement;

        if (rowList[row.rowIndex + 1] != null) {
            cellList = rowList[row.rowIndex + 1].cells;
            if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex - 2] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied") && cellList[cell.cellIndex - 1].children[0].classList.contains(opposing + "-Piece")) {
                cellList = rowList[row.rowIndex + 2].cells;
                if (!cellList[cell.cellIndex - 2].classList.contains("occupied")) {
                    cellList = rowList[row.rowIndex + 1].cells
                    cellList[cell.cellIndex - 1].addEventListener("click", piece.TopLeft)
                    cellList[cell.cellIndex - 1].classList.add("target")
                    cellList[cell.cellIndex - 1].classList.add("possible")
                    stone.classList.add("selected")
                    piece._possible = true
                }
            }
            cellList = rowList[row.rowIndex + 1].cells;
            if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex + 2] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && cellList[cell.cellIndex + 1].children[0].classList.contains(opposing + "-Piece")) {
                cellList = rowList[row.rowIndex + 2].cells;
                if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                    cellList = rowList[row.rowIndex + 1].cells;
                    cellList[cell.cellIndex + 1].addEventListener("click", piece.TopRight)
                    cellList[cell.cellIndex + 1].classList.add("target")
                    cellList[cell.cellIndex + 1].classList.add("possible")
                    stone.classList.add("selected")
                    piece._possible = true
                }
            }
        }
        if (rowList[row.rowIndex - 1] != null) {
            cellList = rowList[row.rowIndex - 1].cells;
            if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex - 2] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied") && cellList[cell.cellIndex - 1].children[0].classList.contains(opposing + "-Piece")) {
                cellList = rowList[row.rowIndex - 2].cells;
                if (!cellList[cell.cellIndex - 2].classList.contains("occupied")) {
                    cellList = rowList[row.rowIndex - 1].cells;
                    cellList[cell.cellIndex - 1].addEventListener("click", piece.BottomLeft)
                    cellList[cell.cellIndex - 1].classList.add("target")
                    cellList[cell.cellIndex - 1].classList.add("possible")
                    stone.classList.add("selected")
                    piece._possible = true
                }
            }
            cellList = rowList[row.rowIndex - 1].cells;
            if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex + 2] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && cellList[cell.cellIndex + 1].children[0].classList.contains(opposing + "-Piece")) {
                cellList = rowList[row.rowIndex - 2].cells;
                if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                    cellList = rowList[row.rowIndex - 1].cells;
                    cellList[cell.cellIndex + 1].addEventListener("click", piece.BottomRight)
                    cellList[cell.cellIndex + 1].classList.add("target")
                    cellList[cell.cellIndex + 1].classList.add("possible")
                    stone.classList.add("selected")
                    piece._possible = true
                }
            }
        }
        if (document.getElementsByClassName("selected") != null && document.getElementsByClassName("selected").length > 1) {
            var possibleSquares = document.getElementsByClassName("possible");
            let x = possibleSquares.length;
            if (possibleSquares.length != 0) {
                for (let i = 0; i < x; i++) {
                    if (
                        possibleSquares[0].removeEventListener("click", piece.BottomLeft) ||
                        possibleSquares[0].removeEventListener("click", piece.BottomRight) ||
                        possibleSquares[0].removeEventListener("click", piece.TopLeft) ||
                        possibleSquares[0].removeEventListener("click", piece.TopRight)
                    ) {

                    }
                    possibleSquares[0].classList.remove("possible");
                }
            }
            var selected = document.getElementsByClassName("selected");
            if (selected.length != 0) {
                for (let i = 0; i <= selected.length; i++) {
                    selected[0].addEventListener("click", piece.attackCheck)
                    selected[0].classList.remove("selected");
                }
            }
        }
    }
}
