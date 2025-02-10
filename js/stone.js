/**
 * @file stone.js
 * @description This file contains the class stone which is used to create a new normal piece
 */

/**
 * all normal pieces
 * @constant {HTMLCollection} BlackPieces - Collection of elements representing the black pieces on the game board.
 * @constant {HTMLCollection} WhitePieces - Collection of elements representing the white pieces on the game board.
 * all dam pieces
 * @constant {HTMLCollection} BlackDam - Collection of elements representing the black dam pieces on the game board.
 * @constant {HTMLCollection} WhiteDam - Collection of elements representing the white dam pieces on the game board.
 */
var BlackPieces = document.getElementsByClassName("Black-Piece")
var WhitePieces = document.getElementsByClassName("White-Piece")

var BlackDam = document.getElementsByClassName("dam Black-Piece");
var WhiteDam = document.getElementsByClassName("dam White-Piece");

/**
 * Creates a new piece
 * @class
 * @extends HTMLImageElement
 * @classdesc Used to make a new normal piece
 */
class stone extends HTMLImageElement {
    /**
     * @constructor
     * Empty constructor
     */
    constructor() {
        super()
    }

    // some variables used inside the elements
    /**
     * @type {boolean}
     */
    possible = null;

    /**
     * @type {stone}
     */
    target = null;

    /**
     * @type {string}
     */
    turn = null;

    /**
     * Returns possible
     * @function
     * @returns {boolean}
     */
    get _possible() {
        return this.possible;
    }

    /**
     * Sets possible
     * @function
     * @param {boolean} possible
     * @returns {void}
     */
    set _possible(possible) {
        this.possible = possible
    }


    /**
     * Used for updates in the game
     * @function
     * @param {string} side
     * @returns {void}
     */
    set _turn(side) {
        console.log(side)
        game.turn = side
        console.log(game.turn)
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
        console.log(game._possible);
        if (game._possible) {
            console.log(game._possible);
            game._possible = !game._possible
        }
        console.log(game._possible);
        switch (game.turn) {
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
                        console.log(new_dam);
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
                    let dam_stone = BlackPieces[j]
                    if(dam_stone instanceof stone)
                        dam_stone.forceAttack(dam_stone, "White", 1)
                }
                for (let j = 0; j < BlackDam.length; j++) {
                    let dam_piece = BlackDam[j];
                    if (dam_piece instanceof dam) {
                        dam_piece.forceAttack(dam_piece, "White")
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
                        console.log(new_dam)
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
                    let piece = BlackPieces[j]
                    if (piece instanceof stone)
                        piece.removeEventListener("click", piece.attackCheck)
                }
                for (let j = 0; j < WhitePieces.length; j++) {
                    let dam_stone = WhitePieces[j]
                    if(dam_stone instanceof stone)
                        dam_stone.forceAttack(dam_stone, "Black", 1)
                }
                for (let j = 0; j < WhiteDam.length; j++) {
                    let dam_piece = WhiteDam[j];
                    if (dam_piece instanceof dam) {
                        dam_piece.forceAttack(dam_piece, "Black")
                    }
                }
                break
        }
    }

    /**
     * Movement function
     * @function
     * @param {Event} event
     * @returns {void}
     */
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
        game._turn = game.turn == "Black" ? "White" : "Black"
        player.children[0].innerHTML = game.turn
    }

    /**
     * Attack function
     * @function
     * @param {HTMLElement} target
     * @param {HTMLElement} newSquare
     * @returns {void}
     */
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
        switch (game.turn) {
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
        // this.forceAttack(document.getElementsByClassName("selected")[0], turn == "Black" ? "White" : "Black")
        if (game._possible && this.forceAttack(document.getElementsByClassName("selected")[0], game.turn == "Black" ? "White" : "Black", 1)) {
            game._possible = !game._possible
        } else {
            game._turn = game.turn == "Black" ? "White" : "Black"
            player.children[0].innerHTML = game.turn
        }
    }

    /**
     * Allows for event listeners to be used properly
     * @function
     * @param {Event} event
     * @returns {void}
     */
    TopLeft(event) {
        const cell = this.closest("td")
        if (!cell) { return; }
        const row = cell.parentElement;
        let newSquare = rowList[row.rowIndex + 1].cells[cell.cellIndex - 1]
        this.attack(this, newSquare)
    }

    /**
     * Allows for event listeners to be used properly
     * @function
     * @param {Event} event
     * @returns {void}
     */
    TopRight(event) {
        const cell = this.closest("td")
        if (!cell) { return; }
        const row = cell.parentElement;
        let newSquare = rowList[row.rowIndex + 1].cells[cell.cellIndex + 1]
        this.attack(this, newSquare)
    }

    /**
     * Allows for event listeners to be used properly
     * @function
     * @param {Event} event
     * @returns {void}
     */
    BottomRight(event) {
        const cell = this.closest("td")
        if (!cell) { return; }
        const row = cell.parentElement;
        let newSquare = rowList[row.rowIndex - 1].cells[cell.cellIndex + 1]
        this.attack(this, newSquare)
    }

    /**
     * Allows for event listeners to be used properly
     * @function
     * @param {Event} event
     * @returns {void}
     */
    BottomLeft(event) {
        const cell = this.closest("td")
        if (!cell) { return; }
        const row = cell.parentElement;
        let newSquare = rowList[row.rowIndex - 1].cells[cell.cellIndex - 1]
        this.attack(this, newSquare)
    }

    /**
     * Optional attacking
     * @function
     * @param {Event} event
     * @returns {void}
     */    
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
        let opposing = game.turn;
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

    /**
     * Checks for attack possibilities
     * @function
     * @param {stone} stone
     * @param {string} opposing
     * @param {number} i
     * @returns {boolean}
     */
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

    /**
     * Movement for black
     * @function
     * @param {Event} event
     * @returns {void}
     */
    setUpBlack(event) {
        if (!game._possible) {
            if (game.turn == "Black") {
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

    /**
     * Movement for white
     * @function
     * @param {Event} event
     * @returns {void}
     */
    setUpWhite(event) {
        if (!game._possible) {
            if (game.turn == "White") {
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