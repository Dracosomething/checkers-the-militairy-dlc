class dam extends stone {
    constructor() {
        super()
    }

    killCounter = 0;

    set _turn(side) {
        super._turn = side;
        for (let i = 0; i < BlackDam.length; i++) {
        }
        for (let i = 0; i < WhiteDam.length; i++) {
        }
    }

    // forceAttack(stone, opposing) {
    //     let bool = false;
    //     for(let x = 0; x < rowList.length; x++) {
    //         console.log(x)
    //         cellList = rowList[x]
    //
    //         bool = super.forceAttack(stone, opposing, x);
    //     }
    //     return bool;
    // }

    attack(target, newSquare) {
        super.attack(target, newSquare);
        for(let i = 0; i < document.getElementsByClassName("target").length; i++) {
            console.log(document.getElementsByClassName("target")[i]);
            document.getElementsByClassName("target")[0].remove()
        }
        this.killCounter++
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

    // black dam movement code
    setUpBlack(event) {
        let booldownleft = true;
        let booldownright = true;
        let boolupleft = true;
        let boolupright = true;
        if (!game._possible) {
            if (game.turn == "Black") {
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
                            targetSquares[0].removeEventListener("click", this.move);
                            targetSquares[0].classList.remove("possible");
                            targetSquares[0].classList.remove("target");
                        }
                    }
                    console.log(this)
                    this.classList.add("selected")
                    for (let i = 1; i < rowList.length; i++) {
                        if (rowList[row.rowIndex + i] != null  && rowList[row.rowIndex + i].cells != null) {
                            cellList = rowList[row.rowIndex + i].cells;
                            if(boolupleft) {
                                if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("black")) {
                                } else if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("white")) {
                                    if (cellList[cell.cellIndex - i].children[0] != null && cellList[cell.cellIndex - i].children[0].classList.contains("White-Piece")) {
                                        let piece;
                                        cellList = rowList[row.rowIndex + i + 1].cells;
                                        if (cellList[cell.cellIndex - i - 1] != null && cellList[cell.cellIndex - i - 1].children[0] != null && cellList[cell.cellIndex - i - 1].children[0].classList.contains("White-Piece")) {
                                            cellList = rowList[row.rowIndex + i + 2].cells;
                                            if (cellList[cell.cellIndex - i - 2] != null && cellList[cell.cellIndex - i - 2].children[0] != null && cellList[cell.cellIndex - i - 2].children[0].classList.contains("White-Piece")) {
                                                boolupleft = false;
                                                return;
                                            } else if(cellList[cell.cellIndex - i - 2] != null) {
                                                cellList = rowList[row.rowIndex + i].cells;
                                                piece = cellList[cell.cellIndex - i].children[0];
                                                piece.classList.add("target");
                                                cellList = rowList[row.rowIndex + i + 1].cells;
                                                piece = cellList[cell.cellIndex - i - 1].children[0];
                                                piece.classList.add("target");
                                                piece.parentElement.classList.add("possible-attack")
                                                piece.addEventListener("click", this.TopLeft)
                                                boolupleft = false;
                                                return;
                                            } else {
                                                boolupleft = false;
                                                return;
                                            }
                                        } else if(cellList[cell.cellIndex - i - 1] != null) {
                                            cellList = rowList[row.rowIndex + i].cells;
                                            piece = cellList[cell.cellIndex - i].children[0];
                                            piece.classList.add("target");
                                            piece.parentElement.classList.add("possible-attack")
                                            piece.addEventListener("click", this.TopLeft)
                                        }
                                    }
                                    cellList = rowList[row.rowIndex + i].cells;
                                    if (!cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                        cellList[cell.cellIndex - i].classList.add("possible")
                                        cellList[cell.cellIndex - i].addEventListener("click", this.move)
                                    }
                                    if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].children[0] != null && cellList[cell.cellIndex - i].children[0].classList.contains("Black-Piece")) {
                                        boolupleft = false
                                        console.log(cellList[cell.cellIndex - i])
                                    }
                                }
                            }
                            cellList = rowList[row.rowIndex + i].cells;
                            if(boolupright) {
                                if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("black")) {
                                } else if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("white")) {
                                    if (cellList[cell.cellIndex + i].children[0] != null && cellList[cell.cellIndex + i].children[0].classList.contains("White-Piece")) {
                                        let piece;
                                        cellList = rowList[row.rowIndex + i + 1].cells;
                                        if (cellList[cell.cellIndex + i + 1] != null && cellList[cell.cellIndex + i + 1].children[0] != null && cellList[cell.cellIndex + i + 1].children[0].classList.contains("White-Piece")) {
                                            cellList = rowList[row.rowIndex + i + 2].cells;
                                            if (cellList[cell.cellIndex + i + 2] != null && cellList[cell.cellIndex + i + 2].children[0] != null && cellList[cell.cellIndex + i + 2].children[0].classList.contains("White-Piece")) {
                                                boolupright = false;
                                                return;
                                            } else if (cellList[cell.cellIndex + i + 2] != null) {
                                                cellList = rowList[row.rowIndex + i].cells;
                                                piece = cellList[cell.cellIndex + i].children[0];
                                                piece.classList.add("target");
                                                cellList = rowList[row.rowIndex + i + 1].cells;
                                                piece = cellList[cell.cellIndex + i + 1].children[0];
                                                piece.classList.add("target");
                                                piece.classList.add("possible-attack")
                                                piece.addEventListener("click", this.TopRight)
                                                boolupright = false;
                                                return;
                                            } else {
                                                boolupright = false;
                                                return;
                                            }
                                        } else if(cellList[cell.cellIndex + i + 1] != null) {
                                            cellList = rowList[row.rowIndex + i].cells;
                                            piece = cellList[cell.cellIndex + i].children[0];
                                            piece.classList.add("target");
                                            piece.parentElement.classList.add("possible-attack")
                                            piece.addEventListener("click", this.TopRight)
                                        }
                                    }
                                    cellList = rowList[row.rowIndex + i].cells;
                                    if (!cellList[cell.cellIndex + i].classList.contains("occupied")) {
                                        cellList[cell.cellIndex + i].classList.add("possible")
                                        cellList[cell.cellIndex + i].addEventListener("click", this.move)
                                    }
                                    if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].children[0] != null && cellList[cell.cellIndex + i].children[0].classList.contains("Black-Piece")) {
                                        boolupright = false
                                        console.log(cellList[cell.cellIndex + i])
                                    }
                                }
                            }
                        }
                        if (rowList[row.rowIndex - i] != null && rowList[row.rowIndex - i].cells != null) {
                            cellList = rowList[row.rowIndex - i].cells;
                            if(booldownright) {
                                if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("black")) {
                                } else if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("white")) {
                                    if (cellList[cell.cellIndex - i].children[0] != null && cellList[cell.cellIndex - i].children[0].classList.contains("White-Piece")) {
                                        let piece;
                                        cellList = rowList[row.rowIndex - i - 1].cells;
                                        console.log(cellList[cell.cellIndex - i - 1])
                                        if (cellList[cell.cellIndex - i - 1] != null && cellList[cell.cellIndex - i - 1].children[0] != null && cellList[cell.cellIndex - i - 1].children[0].classList.contains("White-Piece")) {
                                            cellList = rowList[row.rowIndex - i - 2].cells;
                                            console.log(cellList[cell.cellIndex + i + 2]);
                                            if (cellList[cell.cellIndex - i - 2] != null && cellList[cell.cellIndex - i - 2].children[0] != null && cellList[cell.cellIndex - i - 2].children[0].classList.contains("White-Piece")) {
                                                booldownright = false;
                                                return;
                                            } else if (cellList[cell.cellIndex - i - 2] != null) {
                                                cellList = rowList[row.rowIndex - i].cells;
                                                piece = cellList[cell.cellIndex - i].children[0];
                                                piece.classList.add("target");
                                                cellList = rowList[row.rowIndex - i - 1].cells;
                                                piece = cellList[cell.cellIndex - i - 1].children[0];
                                                piece.classList.add("target");
                                                piece.classList.add("possible-attack")
                                                piece.addEventListener("click", this.BottomLeft);
                                                booldownright = false;
                                                return;
                                            } else {
                                                booldownright = false;
                                                return;
                                            }
                                        } else if(cellList[cell.cellIndex - i - 1] != null) {
                                            cellList = rowList[row.rowIndex - i].cells;
                                            piece = cellList[cell.cellIndex - i].children[0];
                                            piece.classList.add("target");
                                            piece.parentElement.classList.add("possible-attack")
                                            piece.addEventListener("click", this.BottomLeft)
                                        }
                                    }
                                    cellList = rowList[row.rowIndex - i].cells;
                                    if (!cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                        cellList[cell.cellIndex - i].classList.add("possible")
                                        cellList[cell.cellIndex - i].addEventListener("click", this.move)
                                    }
                                    if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].children[0] != null && cellList[cell.cellIndex - i].children[0].classList.contains("Black-Piece")) {
                                        booldownright = false
                                        console.log(cellList[cell.cellIndex - i])
                                    }
                                }
                            }
                            cellList = rowList[row.rowIndex - i].cells;
                            if(booldownleft) {
                                if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("black")) {
                                } else if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("white")) {
                                    if (cellList[cell.cellIndex + i].children[0] != null && cellList[cell.cellIndex + i].children[0].classList.contains("White-Piece")) {
                                        let piece;
                                        cellList = rowList[row.rowIndex - i - 1].cells;
                                        if (cellList[cell.cellIndex + i + 1] != null && cellList[cell.cellIndex + i + 1].children[0] != null && cellList[cell.cellIndex + i + 1].children[0].classList.contains("White-Piece")) {
                                            console.log(cellList[cell.cellIndex + i + 1]);
                                            cellList = rowList[row.rowIndex - i - 2].cells;
                                            if (cellList[cell.cellIndex + i + 2] != null && cellList[cell.cellIndex + i + 2].children[0] != null && cellList[cell.cellIndex + i + 2].children[0].classList.contains("White-Piece")) {
                                                console.log(cellList[cell.cellIndex + i + 2]);
                                                booldownleft = false;
                                                return;
                                            } else if(cellList[cell.cellIndex + i + 2] != null) {
                                                cellList = rowList[row.rowIndex - i].cells;
                                                piece = cellList[cell.cellIndex + i].children[0];
                                                piece.classList.add("target");
                                                cellList = rowList[row.rowIndex - i - 1].cells;
                                                piece = cellList[cell.cellIndex + i + 1].children[0];
                                                piece.classList.add("target");
                                                piece.classList.add("possible-attack")
                                                piece.addEventListener("click", this.BottomRight);
                                                booldownleft = false;
                                                return;
                                            } else {
                                                booldownleft = false;
                                                return;
                                            }
                                        } else if(cellList[cell.cellIndex + i + 1] != null) {
                                            cellList = rowList[row.rowIndex - i].cells;
                                            piece = cellList[cell.cellIndex + i].children[0];
                                            piece.classList.add("target");
                                            piece.parentElement.classList.add("possible-attack")
                                            piece.addEventListener("click", this.BottomRight);
                                        }
                                    }
                                    cellList = rowList[row.rowIndex - i].cells;
                                    if (booldownleft && !cellList[cell.cellIndex + i].classList.contains("occupied")) {
                                        cellList[cell.cellIndex + i].classList.add("possible")
                                        cellList[cell.cellIndex + i].addEventListener("click", this.move)
                                    }
                                    if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].children[0] != null && cellList[cell.cellIndex + i].children[0].classList.contains("Black-Piece")) {
                                        booldownleft = false
                                        console.log(cellList[cell.cellIndex + i])
                                    }
                                }
                            }
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
        if (!game._possible) {
            if (game.turn == "White") {
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

                    for (let i = 1; i < rowList.length; i++) {
                        if (rowList[row.rowIndex + i] != null) {
                            cellList = rowList[row.rowIndex + i].cells;
                            if(boolupleft) {
                                if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("black")) {
                                } else if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("white")) {
                                    if (cellList[cell.cellIndex - i].children[0] != null && cellList[cell.cellIndex - i].children[0].classList.contains("Black-Piece")) {
                                        let piece;
                                        cellList = rowList[row.rowIndex + i + 1].cells;
                                        if (cellList[cell.cellIndex - i - 1] != null && cellList[cell.cellIndex - i - 1].children[0] != null && cellList[cell.cellIndex - i - 1].children[0].classList.contains("Black-Piece")) {
                                            cellList = rowList[row.rowIndex + i + 2].cells;
                                            if (cellList[cell.cellIndex - i - 2] != null && cellList[cell.cellIndex - i - 2].children[0] != null && cellList[cell.cellIndex - i - 2].children[0].classList.contains("Black-Piece")) {
                                                boolupleft = false;
                                                return;
                                            } else if(cellList[cell.cellIndex - i - 2] != null) {
                                                cellList = rowList[row.rowIndex - i].cells;
                                                piece = cellList[cell.cellIndex - i].children[0];
                                                piece.classList.add("target");
                                                cellList = rowList[row.rowIndex - i - 1].cells;
                                                piece = cellList[cell.cellIndex - i - 1].children[0];
                                                piece.classList.add("target");
                                                piece.classList.add("possible-attack")
                                                piece.addEventListener("click", this.TopLeft)
                                            } else {
                                                boolupleft = false;
                                                return;
                                            }
                                        }
                                    }
                                    cellList = rowList[row.rowIndex + i].cells;
                                    if (!cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                        cellList[cell.cellIndex - i].classList.add("possible")
                                        cellList[cell.cellIndex - i].addEventListener("click", this.move)
                                    }
                                    if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].children[0] != null && cellList[cell.cellIndex - i].children[0].classList.contains("White-Piece")) {
                                        boolupleft = false
                                        console.log(cellList[cell.cellIndex - i])
                                    }
                                }
                            }
                            cellList = rowList[row.rowIndex + i].cells;
                            if(boolupright) {
                                if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("black")) {
                                } else if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("white")) {
                                    if (cellList[cell.cellIndex + i].children[0] != null && cellList[cell.cellIndex + i].children[0].classList.contains("Black-Piece")) {
                                        let piece;
                                        cellList = rowList[row.rowIndex + i + 1].cells;
                                        if (cellList[cell.cellIndex + i + 1] != null && cellList[cell.cellIndex + i + 1].children[0] != null && cellList[cell.cellIndex + i + 1].children[0].classList.contains("Black-Piece")) {
                                            cellList = rowList[row.rowIndex + i + 2].cells;
                                            if (cellList[cell.cellIndex + i + 2] != null && cellList[cell.cellIndex + i + 2].children[0] != null && cellList[cell.cellIndex + i + 2].children[0].classList.contains("Black-Piece")) {
                                                boolupright = false;
                                                return;
                                            } else if (cellList[cell.cellIndex + i + 2] != null) {
                                                cellList = rowList[row.rowIndex + i].cells;
                                                piece = cellList[cell.cellIndex + i].children[0];
                                                piece.classList.add("target");
                                                cellList = rowList[row.rowIndex + i + 1].cells;
                                                piece = cellList[cell.cellIndex + i + 1].children[0];
                                                piece.classList.add("target");
                                                piece.classList.add("possible-attack")
                                                piece.addEventListener("click", this.TopRight)
                                            } else {
                                                boolupright = false;
                                                return;
                                            }
                                        }
                                    }
                                    cellList = rowList[row.rowIndex + i].cells;
                                    if (!cellList[cell.cellIndex + i].classList.contains("occupied")) {
                                        cellList[cell.cellIndex + i].classList.add("possible")
                                        cellList[cell.cellIndex + i].addEventListener("click", this.move)
                                    }
                                    if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].children[0] != null && cellList[cell.cellIndex + i].children[0].classList.contains("White-Piece")) {
                                        boolupright = false
                                        console.log(cellList[cell.cellIndex + i])
                                    }
                                }
                            }
                        }
                        if (rowList[row.rowIndex - i] != null) {
                            cellList = rowList[row.rowIndex - i].cells;
                            if(booldownright) {
                                if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("black")) {
                                } else if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("white")) {
                                    if (cellList[cell.cellIndex - i].children[0] != null && cellList[cell.cellIndex - i].children[0].classList.contains("Black-Piece")) {
                                        let piece;
                                        cellList = rowList[row.rowIndex - i - 1].cells;
                                        if (cellList[cell.cellIndex - i - 1] != null && cellList[cell.cellIndex - i - 1].children[0] != null && cellList[cell.cellIndex - i - 1].children[0].classList.contains("Black-Piece")) {
                                            cellList = rowList[row.rowIndex - i - 2].cells;
                                            if (cellList[cell.cellIndex - i - 2] != null && cellList[cell.cellIndex - i - 2].children[0] != null && cellList[cell.cellIndex - i - 2].children[0].classList.contains("Black-Piece")) {
                                                booldownright = false;
                                                return;
                                            } else if (cellList[cell.cellIndex - i - 2] != null) {
                                                cellList = rowList[row.rowIndex - i].cells;
                                                piece = cellList[cell.cellIndex - i].children[0];
                                                piece.classList.add("target");
                                                cellList = rowList[row.rowIndex - i - 1].cells;
                                                piece = cellList[cell.cellIndex - i - 1].children[0];
                                                piece.classList.add("target");
                                                piece.classList.add("possible-attack")
                                                piece.addEventListener("click", this.BottomRight)
                                            } else {
                                                booldownright = false;
                                                return;
                                            }
                                        }
                                    }
                                    cellList = rowList[row.rowIndex - i].cells;
                                    if (!cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                        cellList[cell.cellIndex - i].classList.add("possible")
                                        cellList[cell.cellIndex - i].addEventListener("click", this.move)
                                    }
                                    if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].children[0] != null && cellList[cell.cellIndex - i].children[0].classList.contains("White-Piece")) {
                                        booldownright = false
                                        console.log(cellList[cell.cellIndex - i])
                                    }
                                }
                            }
                            cellList = rowList[row.rowIndex - i].cells;
                            if(booldownleft) {
                                if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("black")) {
                                } else if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("white")) {
                                    if (cellList[cell.cellIndex + i].children[0] != null && cellList[cell.cellIndex + i].children[0].classList.contains("Black-Piece")) {
                                        let piece;
                                        cellList = rowList[row.rowIndex - i - 1].cells;
                                        if (cellList[cell.cellIndex + i + 1] != null && cellList[cell.cellIndex + i + 1].children[0] != null && cellList[cell.cellIndex + i + 1].children[0].classList.contains("Black-Piece")) {
                                            cellList = rowList[row.rowIndex - i - 2].cells;
                                            if (cellList[cell.cellIndex + i + 2] != null && cellList[cell.cellIndex + i + 2].children[0] != null && cellList[cell.cellIndex + i + 2].children[0].classList.contains("Black-Piece")) {
                                                booldownleft = false;
                                                return;
                                            } else if(cellList[cell.cellIndex + i + 2] != null) {
                                                cellList = rowList[row.rowIndex - i].cells;
                                                piece = cellList[cell.cellIndex + i].children[0];
                                                piece.classList.add("target");
                                                cellList = rowList[row.rowIndex - i - 1].cells;
                                                piece = cellList[cell.cellIndex + i + 1].children[0];
                                                piece.classList.add("target");
                                                piece.classList.add("possible-attack")
                                                piece.addEventListener("click", this.BottomLeft);
                                            } else {
                                                booldownleft = false;
                                                return;
                                            }
                                        }
                                    }
                                    cellList = rowList[row.rowIndex - i].cells;
                                    if (booldownleft && !cellList[cell.cellIndex + i].classList.contains("occupied")) {
                                        cellList[cell.cellIndex + i].classList.add("possible")
                                        cellList[cell.cellIndex + i].addEventListener("click", this.move)
                                    }
                                    if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].children[0] != null && cellList[cell.cellIndex + i].children[0].classList.contains("White-Piece")) {
                                        booldownleft = false
                                        console.log(cellList[cell.cellIndex + i])
                                    }
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

customElements.define("dam-dam", dam , { extends: 'img' })