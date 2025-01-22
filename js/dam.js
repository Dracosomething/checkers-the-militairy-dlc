class dam extends stone {
    constructor() {
        super()
    }

    forceAttack(stone, opposing) {
        let bool = false;
        for(let x = 0; x < rowList.length; x++) {
            console.log(x)
            bool = super.forceAttack(stone, opposing, x);
        }
        return bool;
    }

    attack(target, newSquare) {
        super.attack(target, newSquare);
    }

    // black dam movement code
    setUpBlack(event) {
        let booldownleft = true;
        let booldownright = true;
        let boolupleft = true;
        let boolupright = true;
        let counterPosible = 0;
        if (!game._possible) {
            if (game._turn == "Black") {
                if (this.classList.contains("dam")) {
                    const cell = this.closest('td');
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
                        if(counterPosible < 2){
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

                                    if (cellList[cell.cellIndex - i].classList.contains("occupied Black-Piece")) {
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

                                    if (cellList[cell.cellIndex - i].classList.contains("occupied Black-Piece")) {
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

                                    if (cellList[cell.cellIndex - i].classList.contains("occupied Black-Piece")) {
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

                                    if (cellList[cell.cellIndex - i].classList.contains("occupied Black-Piece")) {
                                        booldownleft = false
                                    }
                                }
                            }
                            this.classList.add("selected")
                        }
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
        let counterPosible = 0;
        if (!game._possible) {
            if (game._turn == "White") {
                if (this.classList.contains("dam")) {
                    const cell = this.closest('td');
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
                        if(counterPosible < 2) {
                            if (rowList[row.rowIndex - i] != null) {
                                cellList = rowList[row.rowIndex - i].cells;
                                if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("black")) {
                                } else if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("white")) {
                                    if (cellList[cell.cellIndex + i].children[0] != null && cellList[cell.cellIndex + i].children[0].classList.contains("Black-Piece")) {
                                        booldownleft = false;
                                        cellList[cell.cellIndex + i].classList.add("possible-attack")
                                        cellList[cell.cellIndex + i].addEventListener("click", this.BottomLeft)
                                        counterPosible++;
                                    }
                                    if (booldownleft && !cellList[cell.cellIndex + i].classList.contains("occupied")) {
                                        cellList[cell.cellIndex + i].classList.add("possible")
                                        cellList[cell.cellIndex + i].addEventListener("click", this.move)
                                    }

                                    if (cellList[cell.cellIndex - i].classList.contains("occupied White-Piece")) {
                                        booldownleft = false
                                    }
                                }
                                cellList = rowList[row.rowIndex - i].cells;
                                if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("black")) {
                                } else if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("white")) {
                                    if (cellList[cell.cellIndex - i].children[0] != null && cellList[cell.cellIndex - i].children[0].classList.contains("Black-Piece")) {
                                        booldownright = false;
                                        cellList[cell.cellIndex - i].classList.add("possible-attack")
                                        cellList[cell.cellIndex - i].addEventListener("click", this.BottomLeft)
                                        counterPosible++;
                                    }
                                    if (booldownright && !cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                        cellList[cell.cellIndex - i].classList.add("possible")
                                        cellList[cell.cellIndex - i].addEventListener("click", this.move)
                                    }

                                    if (cellList[cell.cellIndex - i].classList.contains("occupied White-Piece")) {
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
                                        cellList[cell.cellIndex + i].classList.add("possible-attack")
                                        cellList[cell.cellIndex + i].addEventListener("click", this.BottomLeft)
                                        counterPosible++;
                                    }
                                    if (boolupleft && !cellList[cell.cellIndex + i].classList.contains("occupied")) {
                                        cellList[cell.cellIndex + i].classList.add("possible")
                                        cellList[cell.cellIndex + i].addEventListener("click", this.move)
                                    }

                                    if (cellList[cell.cellIndex - i].classList.contains("occupied White-Piece")) {
                                        boolupleft = false
                                    }
                                }
                                cellList = rowList[row.rowIndex + i].cells;
                                if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("black")) {
                                } else if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("white")) {
                                    if (cellList[cell.cellIndex - i].children[0] != null && cellList[cell.cellIndex - i].children[0].classList.contains("Black-P iece")) {
                                        boolupright = false;
                                        cellList[cell.cellIndex - i].classList.add("possible-attack")
                                        cellList[cell.cellIndex - i].addEventListener("click", this.BottomLeft)
                                        counterPosible++;
                                    }
                                    if (boolupright && !cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                        cellList[cell.cellIndex - i].classList.add("possible")
                                        cellList[cell.cellIndex - i].addEventListener("click", this.move)
                                    }

                                    if (cellList[cell.cellIndex - i].classList.contains("occupied White-Piece")) {
                                        boolupright = false
                                    }
                                }
                            }
                            this.classList.add("selected")
                        }
                    }
                }
            }
        }
    }
}

customElements.define("dam-dam", dam , { extends: 'img' })

// export { dam }