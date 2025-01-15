var turn;
// all normal pieces
var BlackPieces = document.getElementsByClassName("Black-Piece")
var WhitePieces = document.getElementsByClassName("White-Piece")
// all dam pieces
var BlackDam = document.getElementsByClassName("dam Black-Piece");
var WhiteDam = document.getElementsByClassName("dam White-Piece");

class stone {
    constructor() { }

    // some variables
    kill_counter;

    possible;

    target;

    // allows to get possible
    get _possible() {
        return piece.possible;
    }

    // allows to set possible
    set _possible(possible) {
        piece.possible = possible
    }

    // gets the turn
    get _turn() {
        return turn;
    }

    // runs when we assign a new value to turn, used for everything needed to happen when a turn ends
    set _turn(side) {
        turn = side
        var selected = document.getElementsByClassName("selected");
        if (selected.length != 0) {
            for (let i = 0; i <= selected.length; i++) {
                selected[0].classList.remove("selected");
            }
        }

        var possibleSquares = document.getElementsByClassName("possible");
        let x = possibleSquares.length
        if (possibleSquares.length != 0) {
            for (let i = 0; i <= x; i++) {
                possibleSquares[0].removeEventListener("click", piece.move);
                possibleSquares[0].classList.remove("possible");
            }
        }

        var targetSquares = document.getElementsByClassName("possible-attack");
        let y = targetSquares.length;
        if (targetSquares.length != 0) {
            for (let i = 0; i < y; i++) {
                targetSquares[0].classList.remove("possible-attack");
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
                for (let j = 0; j < WhitePieces.length; j++) {
                    let stone = WhitePieces[j];
                    if (stone.parentElement != null && stone.parentElement.parentElement != null && stone.parentElement.parentElement.id == "end-black" && !stone.classList.contains("dam")) {
                        console.log(stone + " can evolve")
                        stone.classList.add("dam")
                        stone.src = 'assets/dam_white.png';
                        stone.removeEventListener("click", piece.setUpWhite)
                        stone.addEventListener("click", dam_piece.setUpWhite)
                    }
                }
                if (BlackPieces.length <= 0) {
                    alertWin("white")
                }
                for (let j = 0; j < WhitePieces.length; j++) {
                    let stone = WhitePieces[j]
                    stone.removeEventListener("click", piece.attackCheck)
                }
                for (let j = 0; j < BlackPieces.length; j++) {
                    let stone = BlackPieces[j]
                    piece.forceAttack(stone, "White")
                }
                break
            case "White":
                for (let j = 0; j < BlackPieces.length; j++) {
                    let stone = BlackPieces[j];
                    if (stone.parentElement != null && stone.parentElement.parentElement != null && stone.parentElement.parentElement.id == "end-white" && !stone.classList.contains("dam")) {
                        console.log(stone + " can evolve")
                        stone.classList.add("dam")
                        stone.src = 'assets/dam_black.png';
                        stone.removeEventListener("click", piece.setUpBlack)
                        stone.addEventListener("click", dam_piece.setUpBlack)
                    }
                }
                if (WhitePieces.length <= 0) {
                    alertWin("black")
                }
                for (let j = 0; j < BlackPieces.length; j++) {
                    let stone = BlackPieces[j]
                    stone.removeEventListener("click", piece.attackCheck)
                }
                for (let j = 0; j < WhitePieces.length; j++) {
                    let stone = WhitePieces[j]
                    piece.forceAttack(stone, "Black")
                }
                break
        }
        piece.kill_counter = 0;
    }

    // movement function
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

    // attack function
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
                if (possibleSquares[0].children[0] != null) {
                    possibleSquares[0].children[0].removeEventListener("click", piece.BottomLeft)
                    possibleSquares[0].children[0].removeEventListener("click", piece.BottomRight)
                    possibleSquares[0].children[0].removeEventListener("click", piece.TopLeft)
                    possibleSquares[0].children[0].removeEventListener("click", piece.TopRight)
                }
                possibleSquares[0].classList.remove("possible");
            }
        }
        switch (piece._turn) {
            case "Black":
                let white = document.createElement('img');
                white.src = 'assets/stone_white.png';
                white.className = "score_counter"
                scoreBlack.appendChild(white)
                break
            case "White":
                let black = document.createElement('img');
                black.src = 'assets/stone_black.png';
                black.className = "score_counter"
                scoreWhite.appendChild(black)
                break
        }
        piece.kill_counter += 1;
        piece.forceAttack(document.getElementsByClassName("selected")[0], turn == "Black" ? "White" : "Black")
        if (piece._possible && piece.forceAttack(document.getElementsByClassName("selected")[0], turn == "Black" ? "White" : "Black")) {
            piece._possible = !piece.possible
        } else {
            piece._turn = turn == "Black" ? "White" : "Black"
            player.children[0].innerHTML = piece._turn
        }
    }

    // allows for event listeners to be used properly
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

    // optional attacking
    attackCheck(event) {
        var possibleSquares = document.getElementsByClassName("possible");
        let x = possibleSquares.length;
        if (possibleSquares.length != 0) {
            for (let i = 0; i < x; i++) {
                if (possibleSquares[0].children[0] != null) {
                    possibleSquares[0].children[0].removeEventListener("click", piece.BottomLeft)
                    possibleSquares[0].children[0].removeEventListener("click", piece.BottomRight)
                    possibleSquares[0].children[0].removeEventListener("click", piece.TopLeft)
                    possibleSquares[0].children[0].removeEventListener("click", piece.TopRight)
                }
                possibleSquares[0].classList.remove("possible");
            }
        }
        var selected = document.getElementsByClassName("selected");
        if (selected.length != 0) {
            for (let i = 0; i <= selected.length; i++) {
                // selected[0].addEventListener("click", piece.attackCheck)
                selected[0].classList.remove("selected");
            }
        }
        let stone = event.target
        let opposing = piece._turn;
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
                    cellList[cell.cellIndex - 1].children[0].addEventListener("click", piece.TopLeft)
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
                    cellList[cell.cellIndex + 1].children[0].addEventListener("click", piece.TopRight)
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
                    cellList[cell.cellIndex - 1].children[0].addEventListener("click", piece.BottomLeft)
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
                    cellList[cell.cellIndex + 1].children[0].addEventListener("click", piece.BottomRight)
                    cellList[cell.cellIndex + 1].classList.add("target")
                    cellList[cell.cellIndex + 1].classList.add("possible")
                    stone.classList.add("selected")
                    piece._possible = true
                }
            }
        }
    }

    // checks for attack possibilities
    forceAttack(stone, opposing) {
        const cell = stone.closest('td');
        if (!cell) { return; }
        const row = cell.parentElement;
        let bool = false;

        if (rowList[row.rowIndex + 1] != null) {
            cellList = rowList[row.rowIndex + 1].cells;
            if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex - 2] != null && rowList[row.rowIndex + 2] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied") && cellList[cell.cellIndex - 1].children[0].classList.contains(opposing + "-Piece")) {
                cellList = rowList[row.rowIndex + 2].cells;
                if (!cellList[cell.cellIndex - 2].classList.contains("occupied")) {
                    cellList = rowList[row.rowIndex + 1].cells
                    cellList[cell.cellIndex - 1].children[0].addEventListener("click", piece.TopLeft)
                    cellList[cell.cellIndex - 1].classList.add("target")
                    cellList[cell.cellIndex - 1].classList.add("possible")
                    stone.classList.add("selected")
                    piece._possible = true
                    bool = true;
                }
            }
            cellList = rowList[row.rowIndex + 1].cells;
            if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex + 2] != null && rowList[row.rowIndex + 2] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && cellList[cell.cellIndex + 1].children[0].classList.contains(opposing + "-Piece")) {
                cellList = rowList[row.rowIndex + 2].cells;
                if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                    cellList = rowList[row.rowIndex + 1].cells;
                    cellList[cell.cellIndex + 1].children[0].addEventListener("click", piece.TopRight)
                    cellList[cell.cellIndex + 1].classList.add("target")
                    cellList[cell.cellIndex + 1].classList.add("possible")
                    stone.classList.add("selected")
                    piece._possible = true
                    bool = true;
                }
            }
        }
        if (rowList[row.rowIndex - 1] != null) {
            cellList = rowList[row.rowIndex - 1].cells;
            if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex - 2] != null && rowList[row.rowIndex - 2] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied") && cellList[cell.cellIndex - 1].children[0].classList.contains(opposing + "-Piece")) {
                cellList = rowList[row.rowIndex - 2].cells;
                if (!cellList[cell.cellIndex - 2].classList.contains("occupied")) {
                    cellList = rowList[row.rowIndex - 1].cells;
                    cellList[cell.cellIndex - 1].children[0].addEventListener("click", piece.BottomLeft)
                    cellList[cell.cellIndex - 1].classList.add("target")
                    cellList[cell.cellIndex - 1].classList.add("possible")
                    stone.classList.add("selected")
                    piece._possible = true
                    bool = true
                }
            }
            cellList = rowList[row.rowIndex - 1].cells;
            if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex + 2] != null && rowList[row.rowIndex - 2] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && cellList[cell.cellIndex + 1].children[0].classList.contains(opposing + "-Piece")) {
                cellList = rowList[row.rowIndex - 2].cells;
                if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                    cellList = rowList[row.rowIndex - 1].cells;
                    cellList[cell.cellIndex + 1].children[0].addEventListener("click", piece.BottomRight)
                    cellList[cell.cellIndex + 1].classList.add("target")
                    cellList[cell.cellIndex + 1].classList.add("possible")
                    stone.classList.add("selected")
                    piece._possible = true
                    bool = true
                }
            }
        }
        if (document.getElementsByClassName("selected") != null && document.getElementsByClassName("selected").length > 1) {
            var possibleSquares = document.getElementsByClassName("possible");
            let x = possibleSquares.length;
            if (possibleSquares.length != 0) {
                for (let i = 0; i < x; i++) {
                    if (possibleSquares[0].children[0] != null) {
                        possibleSquares[0].children[0].removeEventListener("click", piece.BottomLeft)
                        possibleSquares[0].children[0].removeEventListener("click", piece.BottomRight)
                        possibleSquares[0].children[0].removeEventListener("click", piece.TopLeft)
                        possibleSquares[0].children[0].removeEventListener("click", piece.TopRight)
                    }
                    possibleSquares[0].classList.remove("possible");
                }
            }
            if (document.getElementsByClassName("target").length != 0) {
                for (let i = 0; i < document.getElementsByClassName("target").length; i++) {
                    {
                        document.getElementsByClassName("target")[0].children[0].removeEventListener("click", piece.BottomLeft)
                        document.getElementsByClassName("target")[0].children[0].removeEventListener("click", piece.BottomRight)
                        document.getElementsByClassName("target")[0].children[0].removeEventListener("click", piece.TopLeft)
                        document.getElementsByClassName("target")[0].children[0].removeEventListener("click", piece.TopRight)
                        document.getElementsByClassName("target")[0].classList.remove("target");
                    }
                }
            }
            var selected = document.getElementsByClassName("selected");
            if (selected.length != 0) {
                for (let i = 0; i <= selected.length; i++) {
                    selected[0].addEventListener("click", piece.attackCheck)
                    selected[0].parentElement.classList.add("possible-attack")
                    selected[0].classList.remove("selected");
                }
            }
        }
        return bool;
    }

    // movement for black
    setUpBlack(event) {
        if (!piece._possible) {
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
                var x = possibleSquares.length;
                if (possibleSquares.length != 0) {
                    for (let i = 0; i <= x; i++) {
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

    // movement for white
    setUpWhite(event) {
        if (!piece._possible) {
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

                var possibleSquares = document.getElementsByClassName("possible");
                var x = possibleSquares.length;
                if (possibleSquares.length != 0) {
                    for (let i = 0; i <= x; i++) {
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
}
