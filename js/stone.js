var turn;
// var cellList;
// all normal pieces
var BlackPieces = document.getElementsByClassName("Black-Piece")
var WhitePieces = document.getElementsByClassName("White-Piece")
// all dam pieces
var BlackDam = document.getElementsByClassName("dam Black-Piece");
var WhiteDam = document.getElementsByClassName("dam White-Piece");

class stone extends HTMLImageElement {
    constructor() {
        super()
    }

    // some variables
    kill_counter;

    possible;

    target;

    // allows to get possible
    get _possible() {
        return this.possible;
    }

    // allows to set possible
    set _possible(possible) {
        this.possible = possible
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
                if(selected[0] instanceof stone) {
                    selected[0].removeEventListener("click", selected[0].attackCheck);
                }
                selected[0].classList.remove("selected");
            }
        }

        var possibleSquares = document.getElementsByClassName("possible");
        let x = possibleSquares.length
        if (possibleSquares.length != 0) {
            for (let i = 0; i <= x; i++) {
                // possibleSquares[0].removeEventListener("click", this.move);
                possibleSquares[0].classList.remove("possible");
            }
        }

        var targetSquares = document.getElementsByClassName("possible-attack");
        let y = targetSquares.length;
        if (targetSquares.length != 0) {
            for (let i = 0; i < y; i++) {
                if(targetSquares[0].children[0] instanceof stone) {
                    targetSquares[0].children[0].removeEventListener("click", targetSquares[0].children[0].attackCheck);
                }
                targetSquares[0].classList.remove("possible-attack");
            }
        }

        var targets = document.getElementsByClassName("target");
        if (targets.length != 0) {
            for (let i = 0; i <= targets.length; i++) {
                // targets[0].removeEventListener("click", this.attack);
                targets[0].classList.remove("target");
            }
        }
        if (game._possible) {
            game._possible = !game.possible
        }
        switch (game._turn) {
            case "Black":
                for (let j = 0; j < WhitePieces.length; j++) {
                    let stone = WhitePieces[j];
                    if (stone.parentElement != null && stone.parentElement.parentElement != null && stone.parentElement.parentElement.id == "end-black" && !stone.classList.contains("dam")) {
                        let new_dam = new dam();
                        new_dam.classList.add("dam")
                        new_dam.classList.add("White-Piece");
                        new_dam.src = 'assets/dam_white.png';
                        new_dam.addEventListener("click", new_dam.setUpWhite)
                        stone.parentElement.appendChild(new_dam)
                        stone.remove();
                    }
                }
                for (let j = 0; j < BlackPieces.length; j++) {
                    let piece = BlackPieces[j]
                    if (piece instanceof stone) {
                        piece.parentElement.removeEventListener("click", piece.BottomLeft)
                        piece.parentElement.removeEventListener("click", piece.BottomRight)
                        piece.parentElement.removeEventListener("click", piece.TopLeft)
                        piece.parentElement.removeEventListener("click", piece.TopRight)
                    }
                }
                if (BlackPieces.length <= 0) {
                    alertWin("white")
                }
                for (let j = 0; j < WhitePieces.length; j++) {
                    let piece = WhitePieces[j]
                    if (piece instanceof stone)
                        piece.removeEventListener("click", piece.attackCheck)
                }
                for (let j = 0; j < BlackPieces.length; j++) {
                    let stone = BlackPieces[j]
                    this.forceAttack(stone, "White", 1)
                }
                for (let j = 0; j < BlackDam.length; j++) {
                    let dam_piece = BlackDam[j];
                    if (dam_piece instanceof dam) {
                        dam_piece.forceAttack(dam_piece, "White", null)
                    }
                }
                break
            case "White":
                for (let j = 0; j < BlackPieces.length; j++) {
                    let stone = BlackPieces[j];
                    if (stone.parentElement != null && stone.parentElement.parentElement != null && stone.parentElement.parentElement.id == "end-white" && !stone.classList.contains("dam")) {
                        let new_dam = new dam();
                        new_dam.classList.add("dam")
                        new_dam.classList.add("Black-Piece")
                        new_dam.src = 'assets/dam_black.png';
                        new_dam.addEventListener("click", new_dam.setUpBlack)
                        stone.parentElement.appendChild(new_dam)
                        stone.remove();
                    }
                }
                for (let j = 0; j < WhitePieces.length; j++) {
                    let piece = BlackPieces[j]
                    if (piece instanceof stone) {
                        piece.parentElement.removeEventListener("click", piece.BottomLeft)
                        piece.parentElement.removeEventListener("click", piece.BottomRight)
                        piece.parentElement.removeEventListener("click", piece.TopLeft)
                        piece.parentElement.removeEventListener("click", piece.TopRight)
                    }
                }
                if (WhitePieces.length <= 0) {
                    alertWin("black")
                }
                for (let j = 0; j < BlackPieces.length; j++) {
                    let piece = WhitePieces[j]
                    if (piece instanceof stone)
                        piece.removeEventListener("click", piece.attackCheck)
                }
                for (let j = 0; j < WhitePieces.length; j++) {
                    let stone = WhitePieces[j]
                    this.forceAttack(stone, "Black", 1)
                }
                for (let j = 0; j < WhiteDam.length; j++) {
                    let dam_piece = WhiteDam[j];
                    if (dam_piece instanceof dam) {
                        dam_piece.forceAttack(dam_piece, "Black", null)
                    }
                }
                break
        }
        game.kill_counter = 0;
    }

    // movement function
    move(event) {
        if (document.getElementsByClassName("selected")[0].parentElement != null) {
            document.getElementsByClassName("selected")[0].parentElement.classList.remove("occupied")
        } else {
            document.getElementsByClassName("selected")[0].classList.remove("occupied")
        }
        this.appendChild(document.getElementsByClassName("selected")[0])
        this.classList.add("occupied")
        var possibleSquares = document.getElementsByClassName("possible");
        let x = possibleSquares.length;
        if (possibleSquares.length != 0) {
            for (let i = 0; i < x; i++) {
                if (this.children[0] instanceof stone)
                    possibleSquares[0].removeEventListener("click", this.children[0].move);
                possibleSquares[0].classList.remove("possible");
            }
        }
        game._turn = game._turn == "Black" ? "White" : "Black"
        player.children[0].innerHTML = game._turn
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
                if (possibleSquares[0].children[0] != null && possibleSquares[0].children[0] instanceof stone) {
                    possibleSquares[0].children[0].removeEventListener("click", possibleSquares[0].children[0].BottomLeft)
                    possibleSquares[0].children[0].removeEventListener("click", possibleSquares[0].children[0].BottomRight)
                    possibleSquares[0].children[0].removeEventListener("click", possibleSquares[0].children[0].TopLeft)
                    possibleSquares[0].children[0].removeEventListener("click", possibleSquares[0].children[0].TopRight)
                    possibleSquares[0].children[0].removeEventListener("click", possibleSquares[0].children[0].attackCheck)
                }
                possibleSquares[0].classList.remove("possible");
            }
        }
        switch (game._turn) {
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
        game.kill_counter += 1;
        // this.forceAttack(document.getElementsByClassName("selected")[0], turn == "Black" ? "White" : "Black")
        if (game._possible && this.forceAttack(document.getElementsByClassName("selected")[0], turn == "Black" ? "White" : "Black", 1)) {
            game._possible = !game.possible
        } else {
            game._turn = turn == "Black" ? "White" : "Black"
            player.children[0].innerHTML = game._turn
        }
    }

    // allows for event listeners to be used properly
    TopLeft(event) {
        const cell = this.closest("td")
        if (!cell) { return; }
        const row = cell.parentElement;
        let newSquare = rowList[row.rowIndex + 1].cells[cell.cellIndex - 1]
        this.attack(this, newSquare)
    }

    TopRight(event) {
        const cell = this.closest("td")
        if (!cell) { return; }
        const row = cell.parentElement;
        let newSquare = rowList[row.rowIndex + 1].cells[cell.cellIndex + 1]
        this.attack(this, newSquare)
    }

    BottomRight(event) {
        const cell = this.closest("td")
        if (!cell) { return; }
        const row = cell.parentElement;
        let newSquare = rowList[row.rowIndex - 1].cells[cell.cellIndex + 1]
        this.attack(this, newSquare)
    }

    BottomLeft(event) {
        const cell = this.closest("td")
        if (!cell) { return; }
        const row = cell.parentElement;
        let newSquare = rowList[row.rowIndex - 1].cells[cell.cellIndex - 1]
        this.attack(this, newSquare)
    }

    // optional attacking
    attackCheck(event) {
        var possibleSquares = document.getElementsByClassName("possible");
        let x = possibleSquares.length;
        if (possibleSquares.length != 0) {
            for (let i = 0; i < x; i++) {
                if (possibleSquares[0].children[0] != null && possibleSquares[0].children[0] instanceof stone) {
                    possibleSquares[0].children[0].removeEventListener("click", possibleSquares[0].children[0].BottomLeft)
                    possibleSquares[0].children[0].removeEventListener("click", possibleSquares[0].children[0].BottomRight)
                    possibleSquares[0].children[0].removeEventListener("click", possibleSquares[0].children[0].TopLeft)
                    possibleSquares[0].children[0].removeEventListener("click", possibleSquares[0].children[0].TopRight)
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
        let piece = this
        let opposing = game._turn;
        const cell = piece.closest('td');
        if (!cell) { return; }
        const row = cell.parentElement;

        if (rowList[row.rowIndex + 1] != null) {
            cellList = rowList[row.rowIndex + 1].cells;
            if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex - 2] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied") && !cellList[cell.cellIndex - 1].children[0].classList.contains(opposing + "-Piece")) {
                cellList = rowList[row.rowIndex + 2].cells;
                if (!cellList[cell.cellIndex - 2].classList.contains("occupied")) {
                    cellList = rowList[row.rowIndex + 1].cells
                    cellList[cell.cellIndex - 1].children[0].addEventListener("click", this.TopLeft)
                    cellList[cell.cellIndex - 1].classList.add("target")
                    cellList[cell.cellIndex - 1].classList.add("possible")
                    piece.classList.add("selected")
                    game._possible = true
                }
            }
            cellList = rowList[row.rowIndex + 1].cells;
            if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex + 2] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && !cellList[cell.cellIndex + 1].children[0].classList.contains(opposing + "-Piece")) {
                cellList = rowList[row.rowIndex + 2].cells;
                if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                    cellList = rowList[row.rowIndex + 1].cells;
                    cellList[cell.cellIndex + 1].children[0].addEventListener("click", this.TopRight)
                    cellList[cell.cellIndex + 1].classList.add("target")
                    cellList[cell.cellIndex + 1].classList.add("possible")
                    piece.classList.add("selected")
                    game._possible = true
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
                    cellList[cell.cellIndex - 1].children[0].addEventListener("click", this.BottomLeft)
                    cellList[cell.cellIndex - 1].classList.add("target")
                    cellList[cell.cellIndex - 1].classList.add("possible")
                    piece.classList.add("selected")
                    game._possible = true
                }
            }
            cellList = rowList[row.rowIndex - 1].cells;
            if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
            } else if (cellList[cell.cellIndex + 2] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && !cellList[cell.cellIndex + 1].children[0].classList.contains(opposing + "-Piece")) {
                cellList = rowList[row.rowIndex - 2].cells;
                if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                    cellList = rowList[row.rowIndex - 1].cells;
                    cellList[cell.cellIndex + 1].children[0].addEventListener("click", this.BottomRight)
                    cellList[cell.cellIndex + 1].classList.add("target")
                    cellList[cell.cellIndex + 1].classList.add("possible")
                    piece.classList.add("selected")
                    game._possible = true
                }
            }
        }
    }

    // checks for attack possibilities
    forceAttack(stone, opposing, i) {
        const cell = stone.closest('td');
        if (!cell) { return; }
        const row = cell.parentElement;
        let bool = false;

        if (rowList[row.rowIndex + i] != null) {
            cellList = rowList[row.rowIndex + i].cells;
            if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("black")) {
            } else if (cellList[cell.cellIndex - i - 1] != null &&
                rowList[row.rowIndex + i + 1] != null &&
                cellList[cell.cellIndex - i].classList.contains("white") &&
                cellList[cell.cellIndex - i].classList.contains("occupied") &&
                cellList[cell.cellIndex - i].children[0].classList.contains(opposing + "-Piece")) {
                cellList = rowList[row.rowIndex + i + 1].cells;
                if (!cellList[cell.cellIndex - i - 1].classList.contains("occupied")) {
                    cellList = rowList[row.rowIndex + i].cells
                    cellList[cell.cellIndex - i].children[0].addEventListener("click", this.TopLeft)
                    cellList[cell.cellIndex - i].classList.add("target")
                    cellList[cell.cellIndex - i].classList.add("possible")
                    stone.classList.add("selected")
                    game._possible = true
                    bool = true;
                }
            }
            cellList = rowList[row.rowIndex + i].cells;
            if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("black")) {
            } else if (cellList[cell.cellIndex + i + 1] != null &&
                rowList[row.rowIndex + i + 1] != null &&
                cellList[cell.cellIndex + i].classList.contains("white") &&
                cellList[cell.cellIndex + i].classList.contains("occupied") &&
                cellList[cell.cellIndex + i].children[0].classList.contains(opposing + "-Piece")) {
                cellList = rowList[row.rowIndex + i + 1].cells;
                if (!cellList[cell.cellIndex + i + 1].classList.contains("occupied")) {
                    cellList = rowList[row.rowIndex + i].cells;
                    cellList[cell.cellIndex + i].children[0].addEventListener("click", this.TopRight)
                    cellList[cell.cellIndex + i].classList.add("target")
                    cellList[cell.cellIndex + i].classList.add("possible")
                    stone.classList.add("selected")
                    game._possible = true
                    bool = true;
                }
            }
        }
        if (rowList[row.rowIndex - i] != null) {
            cellList = rowList[row.rowIndex - i].cells;
            if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("black")) {
            } else if (cellList[cell.cellIndex - i - 1] != null &&
                rowList[row.rowIndex - i - 1] != null &&
                cellList[cell.cellIndex - i].classList.contains("white") &&
                cellList[cell.cellIndex - i].classList.contains("occupied") &&
                cellList[cell.cellIndex - i].children[0].classList.contains(opposing + "-Piece")) {
                cellList = rowList[row.rowIndex - i - 1].cells;
                if (!cellList[cell.cellIndex - i - 1].classList.contains("occupied")) {
                    cellList = rowList[row.rowIndex - i].cells;
                    cellList[cell.cellIndex - i].children[0].addEventListener("click", this.BottomLeft)
                    cellList[cell.cellIndex - i].classList.add("target")
                    cellList[cell.cellIndex - i].classList.add("possible")
                    stone.classList.add("selected")
                    game._possible = true
                    bool = true
                }
            }
            cellList = rowList[row.rowIndex - i].cells;
            if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("black")) {
            } else if (cellList[cell.cellIndex + i + 1] != null &&
                rowList[row.rowIndex - i - 1] != null &&
                cellList[cell.cellIndex + i].classList.contains("white") &&
                cellList[cell.cellIndex + i].classList.contains("occupied") &&
                cellList[cell.cellIndex + i].children[0].classList.contains(opposing + "-Piece")) {
                cellList = rowList[row.rowIndex - i - 1].cells;
                if (!cellList[cell.cellIndex + i + 1].classList.contains("occupied")) {
                    cellList = rowList[row.rowIndex - i].cells;
                    cellList[cell.cellIndex + i].children[0].addEventListener("click", this.BottomRight)
                    cellList[cell.cellIndex + i].classList.add("target")
                    cellList[cell.cellIndex + i].classList.add("possible")
                    stone.classList.add("selected")
                    game._possible = true
                    bool = true
                }
            }
        }
        if (document.getElementsByClassName("selected") != null &&
            document.getElementsByClassName("selected").length > 1) {
            var possibleSquares = document.getElementsByClassName("possible");
            let x = possibleSquares.length;
            if (possibleSquares.length != 0) {
                for (let i = 0; i < x; i++) {
                    if (possibleSquares[0].children[0] != null) {
                        possibleSquares[0].children[0].removeEventListener("click", this.BottomLeft)
                        possibleSquares[0].children[0].removeEventListener("click", this.BottomRight)
                        possibleSquares[0].children[0].removeEventListener("click", this.TopLeft)
                        possibleSquares[0].children[0].removeEventListener("click", this.TopRight)
                    }
                    possibleSquares[0].classList.remove("possible");
                }
            }
            if (document.getElementsByClassName("target").length != 0) {
                for (let i = 0; i < document.getElementsByClassName("target").length; i++) {
                    {
                        document.getElementsByClassName("target")[0].children[0].removeEventListener("click", this.BottomLeft)
                        document.getElementsByClassName("target")[0].children[0].removeEventListener("click", this.BottomRight)
                        document.getElementsByClassName("target")[0].children[0].removeEventListener("click", this.TopLeft)
                        document.getElementsByClassName("target")[0].children[0].removeEventListener("click", this.TopRight)
                        document.getElementsByClassName("target")[0].classList.remove("target");
                    }
                }
            }
            var selected = document.getElementsByClassName("selected");
            if (selected.length != 0) {
                for (let i = 0; i <= selected.length; i++) {
                    selected[0].addEventListener("click", this.attackCheck)
                    selected[0].parentElement.classList.add("possible-attack")
                    selected[0].classList.remove("selected");
                }
            }
        }
        return bool;
    }

    // movement for black
    setUpBlack(event) {
        if (!game._possible) {
            if (game._turn == "Black") {
                const cell = this.closest('td');
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
                    for (let i = 0; i < x; i++) {
                        possibleSquares[0].removeEventListener("click", this.move);
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
                        targetSquares[0].removeEventListener("click", this.move);
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
                            cellList[cell.cellIndex - 1].addEventListener("click", this.move)
                        }
                    }
                    cellList = rowList[row.rowIndex - 1].cells;
                    if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
                    } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
                        if (!cellList[cell.cellIndex + 1].classList.contains("occupied")) {
                            cellList[cell.cellIndex + 1].classList.add("possible")
                            cellList[cell.cellIndex + 1].addEventListener("click", this.move)
                        }
                    }
                }
                this.classList.add("selected")
            }
        }
    }

    // movement for white
    setUpWhite(event) {
        if (!game._possible) {
            if (game._turn == "White") {
                const cell = this.closest('td');
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
                    for (let i = 0; i < x; i++) {
                        possibleSquares[0].removeEventListener("click", this.move);
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
                        targetSquares[0].removeEventListener("click", this.move);
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
                            cellList[cell.cellIndex].addEventListener("click", this.move)
                        }
                    }
                    if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
                    } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
                        if (!cellList[cell.cellIndex + 1].classList.contains("occupied")) {
                            cellList[cell.cellIndex + 1].classList.add("possible")
                            cellList[cell.cellIndex + 1].addEventListener("click", this.move)
                        }
                    }
                    cellList = rowList[row.rowIndex + 1].cells;
                    if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
                    } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white")) {
                        if (!cellList[cell.cellIndex - 1].classList.contains("occupied")) {
                            cellList[cell.cellIndex - 1].classList.add("possible")
                            cellList[cell.cellIndex - 1].addEventListener("click", this.move)
                        }
                    }
                }
                this.classList.add("selected")
            }
        }
    }
}

customElements.define("dam-stone", stone, { extends: 'img' })