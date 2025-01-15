class dam extends stone {
    constructor() {
        super()
    }

    setUpBlack(event) {
        if (!piece._possible) {
            if (piece._turn == "Black") {
                if (event.target.classList.contains("dam")) {
                    const cell = event.target.closest('td');
                    if (!cell) { return; }
                    const row = cell.parentElement;

                    var selected = document.getElementsByClassName("selected");
                    if (selected.length != 0) {
                        for (let i = 0; i <= selected.length; i++) {
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
                            targetSquares[0].removeEventListener("click", piece.move);
                            targetSquares[0].classList.remove("possible");
                        }
                    }
                    for (let i = 0; i < rowList.length; i++) {
                        if (rowList[row.rowIndex + i] != null) {
                            cellList = rowList[row.rowIndex + i].cells;
                            if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - i].classList.contains("white")) {
                                if (!cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    cellList[cell.cellIndex - i].classList.add("possible")
                                    cellList[cell.cellIndex - i].addEventListener("click", piece.move)
                                }
                            }
                            cellList = rowList[row.rowIndex + i].cells;
                            if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + i].classList.contains("white")) {
                                if (!cellList[cell.cellIndex + i].classList.contains("occupied")) {
                                    cellList[cell.cellIndex + i].classList.add("possible")
                                    cellList[cell.cellIndex + i].addEventListener("click", piece.move)
                                }
                            }
                        }
                        if (rowList[row.rowIndex - i] != null) {
                            cellList = rowList[row.rowIndex - i].cells;
                            if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex - i] != null && cellList[cell.cellIndex - 1].classList.contains("white")) {
                                if (!cellList[cell.cellIndex - i].classList.contains("occupied")) {
                                    cellList[cell.cellIndex - i].classList.add("possible")
                                    cellList[cell.cellIndex - i].addEventListener("click", piece.move)
                                }
                            }
                            cellList = rowList[row.rowIndex - i].cells;
                            if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex + i] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
                                if (!cellList[cell.cellIndex + i].classList.contains("occupied")) {
                                    cellList[cell.cellIndex + i].classList.add("possible")
                                    cellList[cell.cellIndex + i].addEventListener("click", piece.move)
                                }
                            }
                        }
                        event.target.classList.add("selected")
                    }
                }
            }
        }
    }

    setUpWhite(event) {
        if (!piece._possible) {
            if (piece._turn == "White") {
                if (event.target.classList.contains("dam")) {
                    const cell = event.target.closest('td');
                    if (!cell) { return; }
                    const row = cell.parentElement;

                    var selected = document.getElementsByClassName("selected");
                    if (selected.length != 0) {
                        for (let i = 0; i <= selected.length; i++) {
                            selected[0].classList.remove("selected");
                        }
                    }

                    var targets = document.getElementsByClassName("target");
                    if (targets.length != 0) {
                        for (let i = 0; i <= targets.length; i++) {
                            targets[0].classList.remove("target");
                        }
                    }

                    var possibleSquares = document.getElementsByClassName("possible");
                    let x = possibleSquares.length;
                    if (possibleSquares.length != 0) {
                        for (let i = 0; i < x; i++) {
                            possibleSquares[0].removeEventListener("click", piece.move);
                            possibleSquares[0].classList.remove("possible");
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

                    for (let i = 0; i < rowList.length; i++) {
                        console.log(i)
                        if (rowList[row.rowIndex - 1] != null) {
                            cellList = rowList[row.rowIndex - 1].cells;
                            if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("white")) {
                                if (!cellList[cell.cellIndex].classList.contains("occupied")) {
                                    cellList[cell.cellIndex].classList.add("possible")
                                    cellList[cell.cellIndex].addEventListener("click", piece.move)
                                }
                            }
                            if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
                                if (!cellList[cell.cellIndex + 1].classList.contains("occupied")) {
                                    cellList[cell.cellIndex + 1].classList.add("possible")
                                    cellList[cell.cellIndex + 1].addEventListener("click", piece.move)
                                }
                            }
                            cellList = rowList[row.rowIndex - 1].cells;
                            if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white")) {
                                if (!cellList[cell.cellIndex - 1].classList.contains("occupied")) {
                                    cellList[cell.cellIndex - 1].classList.add("possible")
                                    cellList[cell.cellIndex - 1].addEventListener("click", piece.move)
                                }
                            }
                        }
                        if (rowList[row.rowIndex + 1] != null) {
                            cellList = rowList[row.rowIndex + 1].cells;
                            if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("white")) {
                                if (!cellList[cell.cellIndex].classList.contains("occupied")) {
                                    cellList[cell.cellIndex].classList.add("possible")
                                    cellList[cell.cellIndex].addEventListener("click", piece.move)
                                }
                            }
                            if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
                                if (!cellList[cell.cellIndex + 1].classList.contains("occupied")) {
                                    cellList[cell.cellIndex + 1].classList.add("possible")
                                    cellList[cell.cellIndex + 1].addEventListener("click", piece.move)
                                }
                            }
                            cellList = rowList[row.rowIndex + 1].cells;
                            if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
                            } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white")) {
                                if (!cellList[cell.cellIndex - 1].classList.contains("occupied")) {
                                    cellList[cell.cellIndex - 1].classList.add("possible")
                                    cellList[cell.cellIndex - 1].addEventListener("click", piece.move)
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