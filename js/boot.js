/**
 * @file boot.js
 * @fileoverview This script defines the boot class, which extends the stone class and represents a boot piece in the game.
 */

/**
 * @class boot
 * @extends stone
 * @classdesc Class representing a boot piece in the game.
 */
class boot extends stone {
    /**
     * @constructor
     * Emty constructor.
     */
    constructor() {
        super();
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
            if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white")) {
            } else if (cellList[cell.cellIndex - 2] != null && cellList[cell.cellIndex - 1].classList.contains("black") && cellList[cell.cellIndex - 1].classList.contains("occupied") && !cellList[cell.cellIndex - 1].children[0].classList.contains(opposing + "-Piece")) {
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
            if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
            } else if (cellList[cell.cellIndex + 2] != null && cellList[cell.cellIndex + 1].classList.contains("black") && cellList[cell.cellIndex + 1].classList.contains("occupied") && !cellList[cell.cellIndex + 1].children[0].classList.contains(opposing + "-Piece")) {
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
            if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white")) {
            } else if (cellList[cell.cellIndex - 2] != null && cellList[cell.cellIndex - 1].classList.contains("black") && cellList[cell.cellIndex - 1].classList.contains("occupied") && !cellList[cell.cellIndex - 1].children[0].classList.contains(opposing + "-Piece")) {
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
            if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
            } else if (cellList[cell.cellIndex + 2] != null && cellList[cell.cellIndex + 1].classList.contains("black") && cellList[cell.cellIndex + 1].classList.contains("occupied") && !cellList[cell.cellIndex + 1].children[0].classList.contains(opposing + "-Piece")) {
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
            if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("white")) {
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
            if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("white")) {
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
            if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("white")) {
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
            if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("white")) {
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
     * Movement for Black
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
                    if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white")) {
                    }
                    cellList = rowList[row.rowIndex + 1].cells;
                    if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
                    }
                }
                if (rowList[row.rowIndex - 1] != null) {
                    cellList = rowList[row.rowIndex - 1].cells;
                    if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white")) {
                    } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
                        if (!cellList[cell.cellIndex - 1].classList.contains("occupied")) {
                            cellList[cell.cellIndex - 1].classList.add("possible")
                            cellList[cell.cellIndex - 1].addEventListener("click", this.move)
                        }
                    }
                    cellList = rowList[row.rowIndex - 1].cells;
                    if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
                    } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
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
                    if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
                    }
                    cellList = rowList[row.rowIndex - 1].cells;
                    if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white")) {
                    }
                }
                if (rowList[row.rowIndex + 1] != null) {
                    cellList = rowList[row.rowIndex + 1].cells;
                    if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("white")) {
                    } else if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("black")) {
                        if (!cellList[cell.cellIndex].classList.contains("occupied")) {
                            cellList[cell.cellIndex].classList.add("possible")
                            cellList[cell.cellIndex].addEventListener("click", this.move)
                        }
                    }
                    if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
                    } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
                        if (!cellList[cell.cellIndex + 1].classList.contains("occupied")) {
                            cellList[cell.cellIndex + 1].classList.add("possible")
                            cellList[cell.cellIndex + 1].addEventListener("click", this.move)
                        }
                    }
                    cellList = rowList[row.rowIndex + 1].cells;
                    if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white")) {
                    } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
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

customElements.define("special-boot", boot , { extends: 'img' })