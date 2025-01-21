let cellList;

import { stone } from "./stone.js";
import * as main from "./script.js";

// export class dam{}
export { dam }

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

        for (let i = 0; i < main.rowList.length; i++) {
            if (main.rowList[row.rowIndex + i] != null) {
                cellList = main.rowList[row.rowIndex + i].cells;
                if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("black")) {
                } else if (cellList[cell.cellIndex - 2] != null && main.rowList[row.rowIndex + 2] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied") && cellList[cell.cellIndex - 1].children[0].classList.contains(opposing + "-Piece")) {
                    cellList = main.rowList[row.rowIndex + 2].cells;
                    if (!cellList[cell.cellIndex - 2].classList.contains("occupied")) {
                        cellList = main.rowList[row.rowIndex + 1].cells
                        cellList[cell.cellIndex - 1].children[0].addEventListener("click", main.piece.TopLeft)
                        cellList[cell.cellIndex - 1].classList.add("target")
                        cellList[cell.cellIndex - 1].classList.add("possible")
                        stone.classList.add("selected")
                        main.piece._possible = true
                        bool = true;
                    }
                }
                cellList = main.rowList[row.rowIndex + 1].cells;
                if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
                } else if (cellList[cell.cellIndex + 2] != null && main.rowList[row.rowIndex + 2] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && cellList[cell.cellIndex + 1].children[0].classList.contains(opposing + "-Piece")) {
                    cellList = main.rowList[row.rowIndex + 2].cells;
                    if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                        cellList = main.rowList[row.rowIndex + 1].cells;
                        cellList[cell.cellIndex + 1].children[0].addEventListener("click", main.piece.TopRight)
                        cellList[cell.cellIndex + 1].classList.add("target")
                        cellList[cell.cellIndex + 1].classList.add("possible")
                        stone.classList.add("selected")
                        main.piece._possible = true
                        bool = true;
                    }
                }
            }
            if (main.rowList[row.rowIndex - 1] != null) {
                cellList = main.rowList[row.rowIndex - 1].cells;
                if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
                } else if (cellList[cell.cellIndex - 2] != null && main.rowList[row.rowIndex - 2] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied") && cellList[cell.cellIndex - 1].children[0].classList.contains(opposing + "-Piece")) {
                    cellList = main.rowList[row.rowIndex - 2].cells;
                    if (!cellList[cell.cellIndex - 2].classList.contains("occupied")) {
                        cellList = main.rowList[row.rowIndex - 1].cells;
                        cellList[cell.cellIndex - 1].children[0].addEventListener("click", main.piece.BottomLeft)
                        cellList[cell.cellIndex - 1].classList.add("target")
                        cellList[cell.cellIndex - 1].classList.add("possible")
                        stone.classList.add("selected")
                        main.piece._possible = true
                        bool = true
                    }
                }
                cellList = main.rowList[row.rowIndex - 1].cells;
                if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
                } else if (cellList[cell.cellIndex + 2] != null && main.rowList[row.rowIndex - 2] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && cellList[cell.cellIndex + 1].children[0].classList.contains(opposing + "-Piece")) {
                    cellList = main.rowList[row.rowIndex - 2].cells;
                    if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                        cellList = main.rowList[row.rowIndex - 1].cells;
                        cellList[cell.cellIndex + 1].children[0].addEventListener("click", main.piece.BottomRight)
                        cellList[cell.cellIndex + 1].classList.add("target")
                        cellList[cell.cellIndex + 1].classList.add("possible")
                        stone.classList.add("selected")
                        main.piece._possible = true
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
                        possibleSquares[0].children[0].removeEventListener("click", main.piece.BottomLeft)
                        possibleSquares[0].children[0].removeEventListener("click", main.piece.BottomRight)
                        possibleSquares[0].children[0].removeEventListener("click", main.piece.TopLeft)
                        possibleSquares[0].children[0].removeEventListener("click", main.piece.TopRight)
                    }
                    possibleSquares[0].classList.remove("possible");
                }
            }
            if (document.getElementsByClassName("target").length != 0) {
                for (let i = 0; i < document.getElementsByClassName("target").length; i++) {
                    {
                        document.getElementsByClassName("target")[0].children[0].removeEventListener("click", main.piece.BottomLeft)
                        document.getElementsByClassName("target")[0].children[0].removeEventListener("click", main.piece.BottomRight)
                        document.getElementsByClassName("target")[0].children[0].removeEventListener("click", main.piece.TopLeft)
                        document.getElementsByClassName("target")[0].children[0].removeEventListener("click", main.piece.TopRight)
                        document.getElementsByClassName("target")[0].classList.remove("target");
                    }
                }
            }
            var selected = document.getElementsByClassName("selected");
            if (selected.length != 0) {
                for (let i = 0; i <= selected.length; i++) {
                    selected[0].addEventListener("click", main.piece.attackCheck)
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

                    var targets = document.getElementsByClassName("occupied");
                    if (targets.length != 0) {
                        for (let i = 0; i < targets.length; i++) {
                            targets[i].removeEventListener("click", main.piece.BottomLeft)
                            targets[i].removeEventListener("click", main.piece.BottomRight)
                            targets[i].removeEventListener("click", main.piece.TopLeft)
                            targets[i].removeEventListener("click", main.piece.TopRight)
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
                            targetSquares[0].classList.remove("target");
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

                                if (cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    boolupleft = false
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

                                if (cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    boolupright = false
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
                                    cellList[cell.cellIndex - i].addEventListener("click", main.dam_piece.BottomLeft)
                                    counterPosible++;
                                }
                                if (booldownright && !cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    cellList[cell.cellIndex - i].classList.add("possible")
                                    cellList[cell.cellIndex - i].addEventListener("click", main.dam_piece.move)
                                }

                                if (cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    booldownright = false
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

                    var targets = document.getElementsByClassName("occupied");
                    if (targets.length != 0) {
                        for (let i = 0; i < targets.length; i++) {
                            targets[i].removeEventListener("click", main.piece.BottomLeft)
                            targets[i].removeEventListener("click", main.piece.BottomRight)
                            targets[i].removeEventListener("click", main.piece.TopLeft)
                            targets[i].removeEventListener("click", main.piece.TopRight)
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
                            targetSquares[0].classList.remove("target");
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

                                if (cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    booldownleft = false
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

                                if (cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    booldownright = false
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

                                if (cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    boolupleft = false
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