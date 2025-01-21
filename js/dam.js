let cellList;

import { stone } from "./stone.js";
import * as main from "./script.js";

// export class dam{}
export { dam }

class dam extends stone {
    constructor() {
        super()
    }
    
    // black dam movement code
    setUpBlack(event) {
        let booldownleft = true;
        let booldownright = true;
        let boolupleft = true;
        let boolupright = true;
        let counterPosible = 0;
        if (!main.piece._possible) {
            if (main.piece._turn == "Black") {
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

                    var possibleSquares = document.getElementsByClassName("possible");
                    let x = possibleSquares.length
                    if (possibleSquares.length != 0) {
                        for (let i = 0; i < x; i++) {
                            possibleSquares[0].removeEventListener("click", main.piece.move);
                            possibleSquares[0].classList.remove("possible");
                        }
                    }

                    var targets = document.getElementsByClassName("target");
                    if (targets.length != 0) {
                        for (let i = 0; i < targets.length; i++) {
                            targets[0].classList.remove("target");
                        }
                    }

                    var targetSquares = document.getElementsByClassName("target");
                    let y = targetSquares.length;
                    if (targetSquares.length != 0) {
                        for (let i = 0; i < y; i++) {
                            targetSquares[0].removeEventListener("click", main.piece.move);
                            targetSquares[0].classList.remove("possible");
                        }
                    }
                    for (let i = 0; i < main.rowList.length; i++) {
                        if (main.rowList[row.rowIndex + i] != null) {
                            cellList = main.rowList[row.rowIndex + i].cells;
                            if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("white")) {
                                if (counterPosible <= 2 && cellList[cell.cellIndex - i].children[0] != null && cellList[cell.cellIndex - i].children[0].classList.contains("White-Piece")) {
                                    boolupleft = false;
                                    let piece = cellList[cell.cellIndex - i];
                                    piece.classList.add("possible-attack")
                                    piece.addEventListener("click", main.dam_piece.TopLeft)
                                    counterPosible++;
                                }
                                if (boolupleft && !cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    cellList[cell.cellIndex - i].classList.add("possible")
                                    cellList[cell.cellIndex - i].addEventListener("click", main.piece.move)
                                }
                            }
                            cellList = main.rowList[row.rowIndex + i].cells;
                            if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("white")) {
                                if (counterPosible <= 2 && cellList[cell.cellIndex + i].children[0] != null && cellList[cell.cellIndex + i].children[0].classList.contains("White-Piece")) {
                                    boolupright = false;
                                    cellList[cell.cellIndex + i].classList.add("possible-attack")
                                    cellList[cell.cellIndex + i].addEventListener("click", main.dam_piece.TopRight)
                                    counterPosible++;
                                }
                                if (boolupright && !cellList[cell.cellIndex + i].classList.contains("occupied")) {
                                    cellList[cell.cellIndex + i].classList.add("possible")
                                    cellList[cell.cellIndex + i].addEventListener("click", main.dam_piece.move)
                                }
                            }
                        }
                        if (main.rowList[row.rowIndex - i] != null) {
                            cellList = main.rowList[row.rowIndex - i].cells;
                            if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("white")) {
                                if (counterPosible <= 2 && cellList[cell.cellIndex - i].children[0] != null && cellList[cell.cellIndex - i].children[0].classList.contains("White-Piece")) {
                                    booldownright = false;
                                    cellList[cell.cellIndex - i].classList.add("possible-attack")
                                    cellList[cell.cellIndex - i].addEventListener("click",main. dam_piece.BottomLeft)
                                    counterPosible++;
                                }
                                if (booldownright && !cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    cellList[cell.cellIndex - i].classList.add("possible")
                                    cellList[cell.cellIndex - i].addEventListener("click", main.dam_piece.move)
                                }
                            }
                            cellList = main.rowList[row.rowIndex - i].cells;
                            if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("white")) {
                                if (counterPosible <= 2 && cellList[cell.cellIndex + i].children[0] != null && cellList[cell.cellIndex + i].children[0].classList.contains("White-Piece")) {
                                    booldownleft = false;
                                    cellList[cell.cellIndex + i].classList.add("possible-attack")
                                    cellList[cell.cellIndex + i].addEventListener("click", main.dam_piece.BottomRight)
                                    counterPosible++;
                                }
                                if (booldownleft && !cellList[cell.cellIndex + i].classList.contains("occupied")) {
                                    cellList[cell.cellIndex + i].classList.add("possible")
                                    cellList[cell.cellIndex + i].addEventListener("click", main.dam_piece.move)
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
        if (!main.piece._possible) {
            if (main.piece._turn == "White") {
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

                    var targets = document.getElementsByClassName("target");
                    if (targets.length != 0) {
                        for (let i = 0; i < targets.length; i++) {
                            targets[0].classList.remove("target");
                        }
                    }

                    var possibleSquares = document.getElementsByClassName("possible");
                    let x = possibleSquares.length;
                    if (possibleSquares.length != 0) {
                        for (let i = 0; i < x; i++) {
                            possibleSquares[0].removeEventListener("click", main.piece.move);
                            possibleSquares[0].classList.remove("possible");
                        }
                    }

                    var targetSquares = document.getElementsByClassName("target");
                    let y = targetSquares.length;
                    if (targetSquares.length != 0) {
                        for (let i = 0; i < y; i++) {
                            targetSquares[0].removeEventListener("click", main.piece.move);
                            targetSquares[0].classList.remove("possible");
                        }
                    }

                    for (let i = 0; i < main.rowList.length; i++) {
                        if (main.rowList[row.rowIndex - i] != null) {
                            cellList = main.rowList[row.rowIndex - i].cells;
                            if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("white")) {
                                if (cellList[cell.cellIndex + i].children[0] != null && cellList[cell.cellIndex + i].children[0].classList.contains("Black-Piece")) {
                                    booldownleft = false;
                                }
                                if (booldownleft && !cellList[cell.cellIndex + i].classList.contains("occupied")) {
                                    cellList[cell.cellIndex + i].classList.add("possible")
                                    cellList[cell.cellIndex + i].addEventListener("click", main.piece.move)
                                }
                            }
                            cellList = main.rowList[row.rowIndex - i].cells;
                            if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("white")) {
                                if (cellList[cell.cellIndex - i].children[0] != null && cellList[cell.cellIndex - i].children[0].classList.contains("Black-Piece")) {
                                    booldownright = false;
                                }
                                if (booldownright && !cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    cellList[cell.cellIndex - i].classList.add("possible")
                                    cellList[cell.cellIndex - i].addEventListener("click", main.piece.move)
                                }
                            }
                        }
                        if (main.rowList[row.rowIndex + i] != null) {
                            cellList = main.rowList[row.rowIndex + i].cells;
                            if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("white")) {
                                if (cellList[cell.cellIndex + i].children[0] != null && cellList[cell.cellIndex + i].children[0].classList.contains("Black-Piece")) {
                                    boolupleft = false;
                                }
                                if (boolupleft && !cellList[cell.cellIndex + i].classList.contains("occupied")) {
                                    cellList[cell.cellIndex + i].classList.add("possible")
                                    cellList[cell.cellIndex + i].addEventListener("click", main.piece.move)
                                }
                            }
                            cellList = main.rowList[row.rowIndex + i].cells;
                            if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("white")) {
                                if (cellList[cell.cellIndex - i].children[0] != null && cellList[cell.cellIndex - i].children[0].classList.contains("Black-P iece")) {
                                    boolupright = false;
                                }
                                if (boolupright && !cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    cellList[cell.cellIndex - i].classList.add("possible")
                                    cellList[cell.cellIndex - i].addEventListener("click", main.piece.move)
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