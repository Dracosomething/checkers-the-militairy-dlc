var turn;
var BlackPieces = document.getElementsByClassName("Black-Piece")
var WhitePieces = document.getElementsByClassName("White-Piece")

class stone {
    constructor() { }

    possible;

    target;

    get _turn() {
        return turn;
    }
    set _turn(side) {
        turn = side
        var selected = document.getElementsByClassName("selected");
        if (selected.length != 0) {
            for (let i = 0; i <= selected.length; i++) {
                console.log(selected[0])
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
                console.log(targetSquares[0])
                targetSquares[0].removeEventListener("click", piece.move);
                targetSquares[0].classList.remove("possible");
            }
        }

        var targets = document.getElementsByClassName("target");
        if (targets.length != 0) {
            for (let i = 0; i <= targets.length; i++) {
                console.log(targets[0])
                targets[0].classList.remove("target");
            }
        }
        switch (piece._turn) {
            case "black":
                if(blackPieces.length == 0){
                    win = true
                }
                for (let j = 0; j < BlackPieces.length; j++) {
                    let stone = BlackPieces[j]
                    piece.forceAttack(stone, "White")
                }
                break
            case "white":
                for (let j = 0; j < WhitePieces.length; j++) {
                    let stone = WhitePieces[j]
                    piece.forceAttack(stone, "Black")
                }
                break
        }
        if (piece.possible) {
            piece.possible = !piece.possible
        }
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
        piece._turn = piece._turn == "black" ? "white" : "black"
        player.children[0].innerHTML = piece._turn
    }

    attack(event) {
        document.getElementsByClassName("selected")[0].parentElement.classList.remove("occupied")
        event.target.appendChild(document.getElementsByClassName("selected")[0])
        event.target.classList.add("occupied")
        var possibleSquares = document.getElementsByClassName("possible");
        document.getElementsByClassName("target")[target].children[0].parentElement.classList.remove("occupied")
        document.getElementsByClassName("target")[target].children[0].remove()
        let x = possibleSquares.length;
        if (possibleSquares.length != 0) {
            for (let i = 0; i < x; i++) {
                possibleSquares[0].removeEventListener("click", piece.attack);
                possibleSquares[0].classList.remove("possible");
            }
        }
        switch (piece._turn){
            case "black":
                let white = document.createElement('img');
                white.src = 'assets/stone-white.png';
                white.className = "score_counter"
                score_black.appendChild(white)
                break
            case "white":
                let black = document.createElement('img');
                black.src = 'assets/stone-black.png';
                black.className = "score_counter"
                score_white.appendChild(black)
                break
        }
        piece._turn = turn == "black" ? "white" : "black"
        player.children[0].innerHTML = piece._turn
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
                    stone.classList.add("selected")
                    piece.possible = true
                }
            }
            cellList = rowList[row.rowIndex + 1].cells;
            if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex + 2] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && cellList[cell.cellIndex + 1].children[0].classList.contains(opposing + "-Piece")) {
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
                    stone.classList.add("selected")
                    piece.possible = true
                }
            }
        }
        if (rowList[row.rowIndex - 1] != null) {
            cellList = rowList[row.rowIndex - 1].cells;
            if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex - 2] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied") && cellList[cell.cellIndex - 1].children[0].classList.contains(opposing + "-Piece")) {
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
                    stone.classList.add("selected")
                    piece.possible = true
                }
            }
            cellList = rowList[row.rowIndex - 1].cells;
            if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex + 2] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && cellList[cell.cellIndex + 1].children[0].classList.contains(opposing + "-Piece")) {
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
                    stone.classList.add("selected")
                    piece.possible = true
                }
            }
        }
        if (document.getElementsByClassName("selected").length > 1) {
            if (rowList[row.rowIndex + 2] != null && rowList[row.rowIndex - 2] != null) {
                if (!rowList[row.rowIndex + 2].cells[cell.cellIndex].classList.contains("possible") && !rowList[row.rowIndex - 2].cells[cell.cellIndex].classList.contains("possible")) {
                    if (!document.getElementsByClassName("selected").length < 1) {
                        let selected = document.getElementsByClassName("selected")
                        for (let i = 0; i < document.getElementsByClassName("selected").length; i++) {
                            document.getElementsByClassName("selected")[0].classList.remove("selected")
                        }
                        for (let x = 0; x < document.getElementsByClassName("possible").length; x++) {
                            document.getElementsByClassName("possible")[x].removeEventListener("click", piece.attack)
                            if (x != 0) {
                                document.getElementsByClassName("possible")[x].classList.remove("possible")
                            }
                        }
                        document.getElementsByClassName("possible")[0].addEventListener("click", piece.attack)
                        selected[0].classList.add("selected")
                        piece.possible = true
                    }
                    piece.possible = true
                }
            } else {
                let numb = Math.floor(Math.random() * document.getElementsByClassName("selected").length)
                if (document.getElementsByClassName("selected").length > 1) {
                    for (let i = 0; i < document.getElementsByClassName("selected").length; i++) {
                        document.getElementsByClassName("selected")[0].classList.remove("selected")
                    }
                    for (let x = 0; x < document.getElementsByClassName("possible").length; x++) {
                        document.getElementsByClassName("possible")[0].removeEventListener("click", piece.attack)
                        if (x != numb) {
                            document.getElementsByClassName("possible")[x].classList.remove("possible")
                        }
                    }
                }
                document.getElementsByClassName("possible")[0].addEventListener("click", piece.attack)
                document.getElementsByClassName("selected")[numb].classList.add("selected")
            }
            piece.possible = true
        }
    }
}
