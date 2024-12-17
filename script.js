var whitePieces = document.getElementsByClassName("startposWhite")
var blackPieces = document.getElementsByClassName("startposBlack")
var BlackSquares = document.getElementsByClassName("black")
var WhiteSquares = document.getElementsByClassName("white")

let generateButton = document.getElementById("generateButton")

const rowList = document.querySelectorAll("table tr")
var cellList;

function generateField() {
    // let white = document.createElement('img');
    // white.src='assets/stone-white.png';
    for (let i = 0; i < whitePieces.length; i++) {
        let white = document.createElement('img');
        white.src = 'assets/stone-white.png';
        white.className = "White-Piece"
        let whitePiece = whitePieces[i];
        white.addEventListener("click", function (e) {
            const cell = e.target.closest('td');
            if (!cell) { return; }
            const row = cell.parentElement;
            console.log(cell.innerHTML, row.rowIndex, cell.cellIndex);
            var possibleSquares = document.getElementsByClassName("possible");
            console.log(possibleSquares.length)
            if (possibleSquares.length != 0) {
                for (let i = 0; i <= possibleSquares.length; i++) {
                    console.log(i)
                    console.log(possibleSquares[0])
                    possibleSquares[0].classList.remove("possible");
                }
            }

            // if (rowList[row.rowIndex - 1] != null) {
            //     console.log("tedsfwef")
            //     cellListUp = rowList[row.rowIndex - 1].cells;
            //     if (cellListUp[cell.cellIndex].classList.contains("black")) {
            //         console.log("black nono up")
            //     } else if (cellListUp[cell.cellIndex].classList.contains("white")){
            //         console.log("yip up")
            //     }
            //     if (cellListUp[cell.cellIndex + 1].classList.contains("black")) {
            //         console.log("black nono up")
            //     } else if (cellListUp[cell.cellIndex + 1].classList.contains("white")){
            //         console.log("yip up")
            //     }
            //     if (cellListUp[cell.cellIndex - 1].classList.contains("black")) {
            //         console.log("black nono up")
            //     } else if (cellListUp[cell.cellIndex - 1].classList.contains("white")){
            //         console.log("yip up")
            //     }
            // }
            if (rowList[row.rowIndex] != null) {
                cellList = rowList[row.rowIndex].cells;
                if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
                    console.log("black nono")
                } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white")) {
                    console.log("yip here")
                    if (!cellList[cell.cellIndex - 1].classList.contains("occupied")) {
                        cellList[cell.cellIndex - 1].classList.add("possible")
                    }
                }
                if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
                    console.log("black nono")
                } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
                    console.log("yip here")
                    if (!cellList[cell.cellIndex + 1].classList.contains("occupied")) {
                        cellList[cell.cellIndex + 1].classList.add("possible")
                    }
                }
            }
            if (rowList[row.rowIndex + 1] != null) {
                cellList = rowList[row.rowIndex + 1].cells;
                if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("black")) {
                    console.log("black nono low")
                } else if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("white")) {
                    console.log("yip low")
                    if (!cellList[cell.cellIndex].classList.contains("occupied")) {
                        cellList[cell.cellIndex].classList.add("possible")
                    }
                }
                if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
                    console.log("black nono low")
                } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
                    console.log("yip low")
                    if (!cellList[cell.cellIndex + 1].classList.contains("occupied")) {
                        cellList[cell.cellIndex + 1].classList.add("possible")
                    }
                }
                if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
                    console.log("black nono low")
                } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white")) {
                    console.log("yip low")
                    if (!cellList[cell.cellIndex - 1].classList.contains("occupied")) {
                        cellList[cell.cellIndex - 1].classList.add("possible")
                    }
                }
            }

            // console.log(cellList[cell.cellIndex])
            // console.log(cellListUp[cell.cellIndex])
            // console.log(cellListLow[cell.cellIndex])
        })
        // console.log(whitePiece + "     " + i)
        whitePiece.appendChild(white)
        whitePiece.classList.add("occupied")
    }
    for (let i = 0; i < blackPieces.length; i++) {
        let black = document.createElement('img');
        black.src = 'assets/stone-black.png';
        black.className = "Black-Piece"
        let blackPiece = blackPieces[i];
        black.addEventListener("click", function (e) {
            const cell = e.target.closest('td');
            if (!cell) { return; }
            const row = cell.parentElement;
            console.log(cell.innerHTML, row.rowIndex, cell.cellIndex);
            var possibleSquares = document.getElementsByClassName("possible");
            console.log(possibleSquares.length)
            if (possibleSquares.length != 0) {
                for (let i = 0; i <= possibleSquares.length; i++) {
                    console.log(i)
                    console.log(possibleSquares[0])
                    possibleSquares[0].classList.remove("possible");
                }
            }

            if (rowList[row.rowIndex - 1] != null) {
                cellList = rowList[row.rowIndex - 1].cells;
                if (cellList[cell.cellIndex].classList.contains("black")) {
                    console.log("black nono up")
                } else if (cellList[cell.cellIndex].classList.contains("white")) {
                    console.log("yip up")
                    if (!cellList[cell.cellIndex].classList.contains("occupied")) {
                        cellList[cell.cellIndex].classList.add("possible")
                    }
                }
                if (cellList[cell.cellIndex + 1].classList.contains("black")) {
                    console.log("black nono up")
                } else if (cellList[cell.cellIndex + 1].classList.contains("white")) {
                    console.log("yip up")
                    if (!cellList[cell.cellIndex + 1].classList.contains("occupied")) {
                        cellList[cell.cellIndex + 1].classList.add("possible")
                    }
                }
                if (cellList[cell.cellIndex - 1].classList.contains("black")) {
                    console.log("black nono up")
                } else if (cellList[cell.cellIndex - 1].classList.contains("white")) {
                    console.log("yip up")
                    if (!cellList[cell.cellIndex - 1].classList.contains("occupied")) {
                        cellList[cell.cellIndex - 1].classList.add("possible")
                    }
                }
            }
            if (rowList[row.rowIndex] != null) {
                cellList = rowList[row.rowIndex].cells;
                if (cellList[cell.cellIndex - 1].classList.contains("black")) {
                    console.log("black nono")
                } else if (cellList[cell.cellIndex - 1].classList.contains("white")) {
                    console.log("yip here")
                    if (!cellList[cell.cellIndex - 1].classList.contains("occupied")) {
                        cellList[cell.cellIndex - 1].classList.add("possible")
                    }
                }
                if (cellList[cell.cellIndex + 1].classList.contains("black")) {
                    console.log("black nono")
                } else if (cellList[cell.cellIndex + 1].classList.contains("white")) {
                    console.log("yip here")
                    if (!cellList[cell.cellIndex + 1].classList.contains("occupied")) {
                        cellList[cell.cellIndex + 1].classList.add("possible")
                    }
                }
            }
            // if (rowList[row.rowIndex + 1] != null) {
            //     cellListLow = rowList[row.rowIndex + 1].cells;
            //     if (cellListLow[cell.cellIndex].classList.contains("black")) {
            //         console.log("black nono low")
            //     } else if (cellListLow[cell.cellIndex].classList.contains("white")){
            //         console.log("yip low")
            //     }
            //     if (cellListLow[cell.cellIndex + 1].classList.contains("black")) {
            //         console.log("black nono low")
            //     } else if (cellListLow[cell.cellIndex + 1].classList.contains("white")){
            //         console.log("yip low")
            //     }
            //     if (cellListLow[cell.cellIndex - 1].classList.contains("black")) {
            //         console.log("black nono low")
            //     } else if (cellListLow[cell.cellIndex - 1].classList.contains("white")){
            //         console.log("yip low")
            //     }
            // }

            // console.log(cellList[cell.cellIndex])
            // console.log(cellListUp[cell.cellIndex])
            // console.log(cellListLow[cell.cellIndex])
        })
        // console.log(whitePiece + "     " + i)
        blackPiece.appendChild(black)
        blackPiece.classList.add("occupied")
    }
    generateButton.setAttribute('disabled', 'false');
}