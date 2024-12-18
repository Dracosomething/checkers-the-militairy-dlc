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

            var selected = document.getElementsByClassName("selected");
            if (selected.length != 0) {
                for (let i = 0; i <= selected.length; i++) {
                    selected[0].classList.remove("selected");
                    // possibleSquares[0].removeEventListener("click", possibleSquares, true);
                }
            }

            var possibleSquares = document.getElementsByClassName("possible");
            console.log(possibleSquares.length)
            if (possibleSquares.length != 0) {
                for (let i = 0; i <= possibleSquares.length; i++) {
                    console.log(i)
                    console.log(possibleSquares[0])
                    possibleSquares[0].removeEventListener("click", move);
                    possibleSquares[0].classList.remove("possible");
                    // possibleSquares[0].removeEventListener("click", possibleSquares, true);
                }
            }

            if (rowList[row.rowIndex - 1] != null) {
                console.log("tedsfwef")
                cellList = rowList[row.rowIndex - 1].cells;
                if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("black")) {
                    console.log("black nono up")
                } else if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("white") && cellList[cell.cellIndex].classList.contains("occupied") && !cellList[cell.cellIndex].children[0].classList.contains("White-Piece")){
                    console.log("yip up")
                }
                if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
                    console.log("black nono up")
                } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && !cellList[cell.cellIndex + 1].children[0].classList.contains("White-Piece")){
                    console.log("yip up")
                }
                if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
                    console.log("black nono up")
                } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied") && !cellList[cell.cellIndex - 1].children[0].classList.contains("White-Piece")){
                    console.log("yip up")
                    cellList = rowList[row.rowIndex - 2].cells;
                    if (!cellList[cell.cellIndex - 2].classList.contains("occupied")) {
                        console.log("yippppppp")
                        cellList[cell.cellIndex - 2].classList.add("possible")
                        cellList[cell.cellIndex - 2].addEventListener("click", attack)
                    }
                }
            }
            // if (rowList[row.rowIndex] != null) {
            //     cellList = rowList[row.rowIndex].cells;
            //     if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
            //         console.log("black nono")
            //     } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white")) {
            //         console.log("yip here")
            //         if (!cellList[cell.cellIndex - 1].classList.contains("occupied")) {
            //             cellList[cell.cellIndex - 1].classList.add("possible")
            //             cellList[cell.cellIndex - 1].addEventListener("click", move)
            //         }
            //     }
            //     if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
            //         console.log("black nono")
            //     } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
            //         console.log("yip here")
            //         if (!cellList[cell.cellIndex + 1].classList.contains("occupied")) {
            //             cellList[cell.cellIndex + 1].classList.add("possible")
            //             cellList[cell.cellIndex + 1].addEventListener("click", move)
            //         }
            //     }
            // }
            if (rowList[row.rowIndex + 1] != null) {
                cellList = rowList[row.rowIndex + 1].cells;
                if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("black")) {
                    console.log("black nono low")
                } else if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("white")) {
                    console.log("yip low")
                    if (!cellList[cell.cellIndex].classList.contains("occupied")) {
                        cellList[cell.cellIndex].classList.add("possible")
                        cellList[cell.cellIndex].addEventListener("click", move)
                    }
                }
                if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
                    console.log("black nono low")
                } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
                    console.log("yip low")
                    if (!cellList[cell.cellIndex + 1].classList.contains("occupied")) {
                        cellList[cell.cellIndex + 1].classList.add("possible")
                        cellList[cell.cellIndex + 1].addEventListener("click", move)
                    }
                }
                if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
                    console.log("black nono low")
                } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white")) {
                    console.log("yip low")
                    if (!cellList[cell.cellIndex - 1].classList.contains("occupied")) {
                        cellList[cell.cellIndex - 1].classList.add("possible")
                        cellList[cell.cellIndex - 1].addEventListener("click", move)
                    }
                }
            }
            console.log(e.target)
            e.target.classList.add("selected")
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

            var selected = document.getElementsByClassName("selected");
            if (selected.length != 0) {
                for (let i = 0; i <= selected.length; i++) {
                    selected[0].classList.remove("selected");
                    // possibleSquares[0].removeEventListener("click", possibleSquares, true);
                }
            }

            var possibleSquares = document.getElementsByClassName("possible");
            console.log(possibleSquares.length)
            if (possibleSquares.length != 0) {
                for (let i = 0; i <= possibleSquares.length; i++) {
                    console.log(i)
                    console.log(possibleSquares[0])
                    possibleSquares[0].removeEventListener("click", move);
                    possibleSquares[0].classList.remove("possible");
                    // possibleSquares[0].removeEventListener("click", possibleSquares, true);
                }
            }

            if (rowList[row.rowIndex - 1] != null) {
                cellList = rowList[row.rowIndex - 1].cells;
                if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("black")) {
                    console.log("black nono up")
                } else if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("white")) {
                    console.log("yip up")
                    if (!cellList[cell.cellIndex].classList.contains("occupied")) {
                        cellList[cell.cellIndex].classList.add("possible")
                        cellList[cell.cellIndex].addEventListener("click", move)
                    }
                }
                if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
                    console.log("black nono up")
                } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
                    console.log("yip up")
                    if (!cellList[cell.cellIndex + 1].classList.contains("occupied")) {
                        cellList[cell.cellIndex + 1].classList.add("possible")
                        cellList[cell.cellIndex + 1].addEventListener("click", move)
                    }
                }
                if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
                    console.log("black nono up")
                } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white")) {
                    console.log("yip up")
                    if (!cellList[cell.cellIndex - 1].classList.contains("occupied")) {
                        cellList[cell.cellIndex - 1].classList.add("possible")
                        cellList[cell.cellIndex - 1].addEventListener("click", move)
                    }
                }
            }
            // if (rowList[row.rowIndex] != null) {
            //     cellList = rowList[row.rowIndex].cells;
            //     if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
            //         console.log("black nono")
            //     } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white")) {
            //         console.log("yip here")
            //         if (!cellList[cell.cellIndex - 1].classList.contains("occupied")) {
            //             cellList[cell.cellIndex - 1].classList.add("possible")
            //             cellList[cell.cellIndex - 1].addEventListener("click", move)
            //         }
            //     }
            //     if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
            //         console.log("black nono")
            //     } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
            //         console.log("yip here")
            //         if (!cellList[cell.cellIndex + 1].classList.contains("occupied")) {
            //             cellList[cell.cellIndex + 1].classList.add("possible")
            //             cellList[cell.cellIndex + 1].addEventListener("click", move)
            //         }
            //     }
            // }
            if (rowList[row.rowIndex - 1] != null) {
                cellList = rowList[row.rowIndex + 1].cells;
                if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("black")) {
                    console.log("black nono low")
                } else if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("white") && !cellList[cell.cellIndex + 1].classList.contains("occupied")){
                    console.log("yip low")
                }
                if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
                    console.log("black nono low")
                } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white") && !cellList[cell.cellIndex].classList.contains("occupied")){
                    console.log("yip low")
                }
                if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
                    console.log("black nono low")
                } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied")){
                    console.log("yip low")
                }
            }

            e.target.classList.add("selected")


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

function move(event){
    console.log("code            " + event + "                   " + document.getElementsByClassName("selected")[0].parentElement)
    document.getElementsByClassName("selected")[0].parentElement.classList.remove("occupied")
    event.target.appendChild(document.getElementsByClassName("selected")[0])
    event.target.classList.add("occupied")
    var possibleSquares = document.getElementsByClassName("possible");
    console.log(possibleSquares.length)
    if (possibleSquares.length != 0) {
        for (let i = 0; i <= possibleSquares.length; i++) {
            console.log(i)
            console.log(possibleSquares[0])
            possibleSquares[0].removeEventListener("click", move);
            possibleSquares[0].classList.remove("possible");
            // possibleSquares[0].removeEventListener("click", possibleSquares, true);
        }
    }
}

function attack(event){
    console.log("attack")
}