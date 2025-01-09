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
        switch (piece._turn) {
            case "black":
                for (let j = 0; j < BlackPieces.length; j++) {
                    console.log("blackturn")
                    let stone = BlackPieces[j]
                    piece.forceAttack(stone, "White")
                }
                break
            case "white":
                for (let j = 0; j < WhitePieces.length; j++) {
                    console.log("whiteturn")
                    let stone = WhitePieces[j]
                    piece.forceAttack(stone, "Black")
                }
                break
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
        console.log(piece._turn)
        piece._turn = piece._turn == "black" ? "white" : "black"
        player.children[0].innerHTML = piece._turn
    }

    attack(event) {
        console.log(document.getElementsByClassName("selected"))
        document.getElementsByClassName("selected")[0].parentElement.classList.remove("occupied")
        event.target.appendChild(document.getElementsByClassName("selected")[0])
        event.target.classList.add("occupied")
        var possibleSquares = document.getElementsByClassName("possible");
        console.log(document.getElementsByClassName("target"))
        document.getElementsByClassName("target")[target].children[0].parentElement.classList.remove("occupied")
        document.getElementsByClassName("target")[target].children[0].remove()
        let x = possibleSquares.length;
        if (possibleSquares.length != 0) {
            for (let i = 0; i < x; i++) {
                possibleSquares[0].removeEventListener("click", piece.attack);
                possibleSquares[0].classList.remove("possible");
            }
        }
        piece._turn = turn == "black" ? "white" : "black"
        player.children[0].innerHTML = piece._turn
    }

    forceAttack(stone, opposing) {
        const cell = stone.closest('td');
        if (!cell) { return; }
        const row = cell.parentElement;

        // console.log(stone)

        var selected = document.getElementsByClassName("selected");
        if (selected.length != 0) {
            for (let i = 0; i <= selected.length; i++) {
                if (selected[0].classList.contains(opposing + "-Piece")) {
                    console.log(selected[0])
                    selected[0].classList.remove("selected");
                }
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
                if (!targets[0].classList.contains(opposing + "-Piece")) {
                    console.log(targets[0])
                    targets[0].classList.remove("target");
                }
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
                // console.log("sddfsfew")
            } else if (cellList[cell.cellIndex - 2] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied") && cellList[cell.cellIndex - 1].children[0].classList.contains(opposing + "-Piece")) {
                cellList = rowList[row.rowIndex + 2].cells;
                // console.log("text")
                if (!cellList[cell.cellIndex - 2].classList.contains("occupied")) {
                    // console.log(" erwetwt")
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
                // console.log("text")
                if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                    // console.log(" erwetwt")
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
                // console.log("text")
                if (!cellList[cell.cellIndex - 2].classList.contains("occupied")) {
                    // console.log(" erwetwt")
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
                // console.log("text")
                if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                    // console.log(" erwetwt")
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
            // console.log(stone.classList)
        }
    }
}