// import * as main from "./script.js";
// import { stone } from "./_stone.js";

// let cellList;

// setTimeout(document.currentScript, 10)

class dam extends stone {
    constructor() {
        super()
    }

    // checks for attack possibilities
    forceAttack(stone, opposing) {
        const cell = stone.closest('td');
        if (!cell) { return; }
        const row = cell.parentElement;
        let bool = false;

        for (let i = 0; i < rowList.length; i++) {
            if (rowList[row.rowIndex + i] != null) {
                cellList = rowList[row.rowIndex + i].cells;
                if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("black")) {
                } else if (cellList[cell.cellIndex - 2] != null && rowList[row.rowIndex + 2] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied") && cellList[cell.cellIndex - 1].children[0].classList.contains(opposing + "-Piece")) {
                    cellList = rowList[row.rowIndex + 2].cells;
                    if (!cellList[cell.cellIndex - 2].classList.contains("occupied")) {
                        cellList = rowList[row.rowIndex + 1].cells
                        cellList[cell.cellIndex - 1].children[0].addEventListener("click", this.TopLeft)
                        cellList[cell.cellIndex - 1].classList.add("target")
                        cellList[cell.cellIndex - 1].classList.add("possible")
                        stone.classList.add("selected")
                        this._possible = true
                        bool = true;
                    }
                }
                cellList = rowList[row.rowIndex + 1].cells;
                if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
                } else if (cellList[cell.cellIndex + 2] != null && rowList[row.rowIndex + 2] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && cellList[cell.cellIndex + 1].children[0].classList.contains(opposing + "-Piece")) {
                    cellList = rowList[row.rowIndex + 2].cells;
                    if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                        cellList = rowList[row.rowIndex + 1].cells;
                        cellList[cell.cellIndex + 1].children[0].addEventListener("click", this.TopRight)
                        cellList[cell.cellIndex + 1].classList.add("target")
                        cellList[cell.cellIndex + 1].classList.add("possible")
                        stone.classList.add("selected")
                        this._possible = true
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
                        cellList[cell.cellIndex - 1].children[0].addEventListener("click", this.BottomLeft)
                        cellList[cell.cellIndex - 1].classList.add("target")
                        cellList[cell.cellIndex - 1].classList.add("possible")
                        stone.classList.add("selected")
                        this._possible = true
                        bool = true
                    }
                }
                cellList = rowList[row.rowIndex - 1].cells;
                if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
                } else if (cellList[cell.cellIndex + 2] != null && rowList[row.rowIndex - 2] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && cellList[cell.cellIndex + 1].children[0].classList.contains(opposing + "-Piece")) {
                    cellList = rowList[row.rowIndex - 2].cells;
                    if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                        cellList = rowList[row.rowIndex - 1].cells;
                        cellList[cell.cellIndex + 1].children[0].addEventListener("click", this.BottomRight)
                        cellList[cell.cellIndex + 1].classList.add("target")
                        cellList[cell.cellIndex + 1].classList.add("possible")
                        stone.classList.add("selected")
                        this._possible = true
                        bool = true
                    }
                }
            }
        }
        if (document.getElementsByClassName("selected") != null && document.getElementsByClassName("selected").length > 1) {
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
    // black dam movement code
    setUpBlack(event) {
        let booldownleft = true;
        let booldownright = true;
        let boolupleft = true;
        let boolupright = true;
        let counterPosible = 0;
        if (!this._possible) {
            if (this._turn == "Black") {
                if (event.target.classList.contains("dam")) {
                    const cell = event.target.closest('td');
                    if (!cell) { return; }
                    const row = cell.parentElement;

                    var selected = document.getElementsByClassName("selected");
                    if (selected.length != 0) {
                        for (let i = 0; i < selected.length; i++) {
                            selected[0].classList.remove("selected");
                        }
                    }

                    var targets = document.getElementsByClassName("occupied");
                    if (targets.length != 0) {
                        for (let i = 0; i < targets.length; i++) {
                            targets[i].removeEventListener("click", this.BottomLeft)
                            targets[i].removeEventListener("click", this.BottomRight)
                            targets[i].removeEventListener("click", this.TopLeft)
                            targets[i].removeEventListener("click", this.TopRight)
                        }
                    }

                    var possibleSquares = document.getElementsByClassName("possible");
                    let x = possibleSquares.length;
                    if (possibleSquares.length != 0) {
                        for (let i = 0; i < x; i++) {
                            possibleSquares[0].removeEventListener("click", this.move);
                            possibleSquares[0].classList.remove("possible");
                        }
                    }

                    var targetSquares = document.getElementsByClassName("target");
                    let y = targetSquares.length;
                    if (targetSquares.length != 0) {
                        for (let i = 0; i < y; i++) {
                            targetSquares[0].classList.remove("target");
                            targetSquares[0].removeEventListener("click", this.move);
                            targetSquares[0].classList.remove("possible");
                        }
                    }

                    for (let i = 0; i < rowList.length; i++) {
                        if (rowList[row.rowIndex + i] != null) {
                            cellList = rowList[row.rowIndex + i].cells;
                            if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("white")) {
                                if (counterPosible <= 2 && cellList[cell.cellIndex - i].children[0] != null && cellList[cell.cellIndex - i].children[0].classList.contains("White-Piece")) {
                                    boolupleft = false;
                                    let piece = cellList[cell.cellIndex - i];
                                    piece.classList.add("possible-attack")
                                    piece.addEventListener("click", this.TopLeft)
                                    counterPosible++;
                                }
                                if (boolupleft && !cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    cellList[cell.cellIndex - i].classList.add("possible")
                                    cellList[cell.cellIndex - i].addEventListener("click", this.move)
                                }

                                if (cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    boolupleft = false
                                }
                            }
                            cellList = rowList[row.rowIndex + i].cells;
                            if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("white")) {
                                if (counterPosible <= 2 && cellList[cell.cellIndex + i].children[0] != null && cellList[cell.cellIndex + i].children[0].classList.contains("White-Piece")) {
                                    boolupright = false;
                                    cellList[cell.cellIndex + i].classList.add("possible-attack")
                                    cellList[cell.cellIndex + i].addEventListener("click", this.TopRight)
                                    counterPosible++;
                                }
                                if (boolupright && !cellList[cell.cellIndex + i].classList.contains("occupied")) {
                                    cellList[cell.cellIndex + i].classList.add("possible")
                                    cellList[cell.cellIndex + i].addEventListener("click", this.move)
                                }

                                if (cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    boolupright = false
                                }
                            }
                        }
                        if (rowList[row.rowIndex - i] != null) {
                            cellList = rowList[row.rowIndex - i].cells;
                            if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("white")) {
                                if (counterPosible <= 2 && cellList[cell.cellIndex - i].children[0] != null && cellList[cell.cellIndex - i].children[0].classList.contains("White-Piece")) {
                                    booldownright = false;
                                    cellList[cell.cellIndex - i].classList.add("possible-attack")
                                    cellList[cell.cellIndex - i].addEventListener("click", this.BottomLeft)
                                    counterPosible++;
                                }
                                if (booldownright && !cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    cellList[cell.cellIndex - i].classList.add("possible")
                                    cellList[cell.cellIndex - i].addEventListener("click", this.move)
                                }

                                if (cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    booldownright = false
                                }
                            }
                            cellList = rowList[row.rowIndex - i].cells;
                            if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("white")) {
                                if (counterPosible <= 2 && cellList[cell.cellIndex + i].children[0] != null && cellList[cell.cellIndex + i].children[0].classList.contains("White-Piece")) {
                                    booldownleft = false;
                                    cellList[cell.cellIndex + i].classList.add("possible-attack")
                                    cellList[cell.cellIndex + i].addEventListener("click", this.BottomRight)
                                    counterPosible++;
                                }
                                if (booldownleft && !cellList[cell.cellIndex + i].classList.contains("occupied")) {
                                    cellList[cell.cellIndex + i].classList.add("possible")
                                    cellList[cell.cellIndex + i].addEventListener("click", this.move)
                                }

                                if (cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    booldownleft = false
                                }
                            }
                        }
                        event.target.classList.add("selected")
                    }
                }
            }
        }
    }

    // white dam movement code
    setUpWhite(event) {
        let booldownleft = true;
        let booldownright = true;
        let boolupleft = true;
        let boolupright = true;
        if (!this._possible) {
            if (this._turn == "White") {
                if (event.target.classList.contains("dam")) {
                    const cell = event.target.closest('td');
                    if (!cell) { return; }
                    const row = cell.parentElement;

                    var selected = document.getElementsByClassName("selected");
                    if (selected.length != 0) {
                        for (let i = 0; i < selected.length; i++) {
                            selected[0].classList.remove("selected");
                        }
                    }

                    var targets = document.getElementsByClassName("occupied");
                    if (targets.length != 0) {
                        for (let i = 0; i < targets.length; i++) {
                            targets[i].removeEventListener("click", this.BottomLeft)
                            targets[i].removeEventListener("click", this.BottomRight)
                            targets[i].removeEventListener("click", this.TopLeft)
                            targets[i].removeEventListener("click", this.TopRight)
                        }
                    }

                    var possibleSquares = document.getElementsByClassName("possible");
                    let x = possibleSquares.length;
                    if (possibleSquares.length != 0) {
                        for (let i = 0; i < x; i++) {
                            possibleSquares[0].removeEventListener("click", this.move);
                            possibleSquares[0].classList.remove("possible");
                        }
                    }

                    var targetSquares = document.getElementsByClassName("target");
                    let y = targetSquares.length;
                    if (targetSquares.length != 0) {
                        for (let i = 0; i < y; i++) {
                            targetSquares[0].classList.remove("target");
                            targetSquares[0].removeEventListener("click", this.move);
                            targetSquares[0].classList.remove("possible");
                        }
                    }

                    for (let i = 0; i < rowList.length; i++) {
                        if (rowList[row.rowIndex - i] != null) {
                            cellList = rowList[row.rowIndex - i].cells;
                            if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("white")) {
                                if (cellList[cell.cellIndex + i].children[0] != null && cellList[cell.cellIndex + i].children[0].classList.contains("Black-Piece")) {
                                    booldownleft = false;
                                }
                                if (booldownleft && !cellList[cell.cellIndex + i].classList.contains("occupied")) {
                                    cellList[cell.cellIndex + i].classList.add("possible")
                                    cellList[cell.cellIndex + i].addEventListener("click", this.move)
                                }

                                if (cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    booldownleft = false
                                }
                            }
                            cellList = rowList[row.rowIndex - i].cells;
                            if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("white")) {
                                if (cellList[cell.cellIndex - i].children[0] != null && cellList[cell.cellIndex - i].children[0].classList.contains("Black-Piece")) {
                                    booldownright = false;
                                }
                                if (booldownright && !cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    cellList[cell.cellIndex - i].classList.add("possible")
                                    cellList[cell.cellIndex - i].addEventListener("click", this.move)
                                }

                                if (cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    booldownright = false
                                }
                            }
                        }
                        if (rowList[row.rowIndex + i] != null) {
                            cellList = rowList[row.rowIndex + i].cells;
                            if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("white")) {
                                if (cellList[cell.cellIndex + i].children[0] != null && cellList[cell.cellIndex + i].children[0].classList.contains("Black-Piece")) {
                                    boolupleft = false;
                                }
                                if (boolupleft && !cellList[cell.cellIndex + i].classList.contains("occupied")) {
                                    cellList[cell.cellIndex + i].classList.add("possible")
                                    cellList[cell.cellIndex + i].addEventListener("click", this.move)
                                }

                                if (cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    boolupleft = false
                                }
                            }
                            cellList = rowList[row.rowIndex + i].cells;
                            if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("white")) {
                                if (cellList[cell.cellIndex - i].children[0] != null && cellList[cell.cellIndex - i].children[0].classList.contains("Black-P iece")) {
                                    boolupright = false;
                                }
                                if (boolupright && !cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    cellList[cell.cellIndex - i].classList.add("possible")
                                    cellList[cell.cellIndex - i].addEventListener("click", this.move)
                                }

                                if (cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    boolupright = false
                                }
                            }
                        }
                        event.target.classList.add("selected")
                    }
                }
            }
        }
    }
}

customElements.define("dam-dam", dam , { extends: 'img' })

// export { dam }