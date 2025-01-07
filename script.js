var whitePieces = document.getElementsByClassName("startposWhite")
var blackPieces = document.getElementsByClassName("startposBlack")
var BlackSquares = document.getElementsByClassName("black")
var WhiteSquares = document.getElementsByClassName("white")

let generateButton = document.getElementById("generateButton")

const rowList = document.querySelectorAll("table tr")
var cellList;
var target;

function generateField() {
    // let white = document.createElement('img');
    // white.src='assets/stone-white.png';
    for (let i = 0; i < whitePieces.length; i++) {
        let white = document.createElement('img');
        white.src = 'assets/stone-white.png';
        white.className = "White-Piece"
        let whitePiece = whitePieces[i];
        white.addEventListener("click", setUpWhite)
        // console.log(whitePiece + "     " + i)
        whitePiece.appendChild(white)
        whitePiece.classList.add("occupied")
    }
    for (let i = 0; i < blackPieces.length; i++) {
        let black = document.createElement('img');
        black.src = 'assets/stone-black.png';
        black.className = "Black-Piece"
        let blackPiece = blackPieces[i];
        black.addEventListener("click", setUpBlack)
        // console.log(whitePiece + "     " + i)
        blackPiece.appendChild(black)
        blackPiece.classList.add("occupied")
    }
    generateButton.setAttribute('disabled', 'false');
}

function setUpBlack(event) {
    const cell = event.target.closest('td');
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
        }else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && !cellList[cell.cellIndex + 1].children[0].classList.contains("White-Piece")) {
            console.log("yip up")
            // cellList[cell.cellIndex + 1].classList.add("target")
            // console.log(document.getElementsByClassName("target"))
            cellList = rowList[row.rowIndex + 2].cells;
            if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                console.log("yippppppp")
                cellList[cell.cellIndex + 2].classList.add("possible")
                cellList[cell.cellIndex + 2].addEventListener("click", function(){
                    switch(document.getElementsByClassName("target").length){
                        case 2:
                            getTarget(0)
                            break;
                        case 3:
                            getTarget(0)
                            break;
                        case 4:
                            getTarget(0);
                            break;
                        case 1:
                            getTarget(0);
                            break;
                    }
                })
                cellList[cell.cellIndex + 2].addEventListener("click", attack)
                cellList = rowList[row.rowIndex - 1].cells
                cellList[cell.cellIndex + 1].classList.add("target")
                console.log(document.getElementsByClassName("target"))
            }
        } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
            console.log("yip up")
            if (!cellList[cell.cellIndex + 1].classList.contains("occupied")) {
                cellList[cell.cellIndex + 1].classList.add("possible")
                cellList[cell.cellIndex + 1].addEventListener("click", move)
            }
        }
        if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
            console.log("black nono up")
        } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied") && !cellList[cell.cellIndex - 1].children[0].classList.contains("White-Piece")) {
            console.log("yip up")
            // cellList[cell.cellIndex + 1].classList.add("target")
            // console.log(document.getElementsByClassName("target"))
            cellList = rowList[row.rowIndex - 2].cells;
            if (!cellList[cell.cellIndex - 2].classList.contains("occupied")) {
                console.log("yippppppp")
                cellList[cell.cellIndex - 2].classList.add("possible")
                cellList[cell.cellIndex - 2].addEventListener("click", function(){
                    switch(document.getElementsByClassName("target").length){
                        case 2:
                            getTarget(1)
                            break;
                        case 3:
                            getTarget(1)
                            break;
                        case 4:
                            getTarget(1);
                            break;
                        case 1:
                            getTarget(0);
                            break;
                    }
                })
                cellList[cell.cellIndex - 2].addEventListener("click", attack)
                cellList = rowList[row.rowIndex - 1].cells
                cellList[cell.cellIndex - 1].classList.add("target")
                console.log(document.getElementsByClassName("target"))
            }
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
        console.log("tedsfwef")
        cellList = rowList[row.rowIndex - 1].cells;
        if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("black")) {
            console.log("black nono up")
        } else if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("white") && cellList[cell.cellIndex].classList.contains("occupied") && !cellList[cell.cellIndex].children[0].classList.contains("White-Piece")) {
            console.log("yip up")
        }
        if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
            console.log("black nono up")
        } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && !cellList[cell.cellIndex + 1].children[0].classList.contains("White-Piece")) {
            console.log("yip up")
            // cellList[cell.cellIndex + 1].classList.add("target")
            // console.log(document.getElementsByClassName("target"))
            cellList = rowList[row.rowIndex + 2].cells;
            if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                console.log("yippppppp")
                cellList[cell.cellIndex + 2].classList.add("possible")
                cellList[cell.cellIndex + 2].addEventListener("click", function () {
                    switch (document.getElementsByClassName("target").length) {
                        case 2:
                            getTarget(1)
                            break;
                        case 3:
                            getTarget(2)
                            break;
                        case 4:
                            getTarget(2);
                            break;
                        case 1:
                            getTarget(0);
                            break;
                    }
                })
                cellList[cell.cellIndex + 2].addEventListener("click", attack)
                cellList = rowList[row.rowIndex - 1].cells
                cellList[cell.cellIndex + 1].classList.add("target")
                console.log(document.getElementsByClassName("target"))
            }
        }
        console.log("erwerwerwer")
        cellList = rowList[row.rowIndex - 1].cells;
        if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
            console.log("black nono up")
        } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied") && !cellList[cell.cellIndex - 1].children[0].classList.contains("Black-Piece")) {
            console.log("yip up")
            // cellList[cell.cellIndex - 1].classList.add("target")
            // console.log(document.getElementsByClassName("target"))
            cellList = rowList[row.rowIndex - 2].cells;
            if (!cellList[cell.cellIndex - 2].classList.contains("occupied")) {
                console.log("yippppppp2")
                cellList[cell.cellIndex - 2].classList.add("possible")
                cellList[cell.cellIndex - 2].addEventListener("click", function () {
                    switch (document.getElementsByClassName("target").length) {
                        case 2:
                            getTarget(1)
                            break;
                        case 3:
                            getTarget(2)
                            break;
                        case 4:
                            getTarget(3);
                            break;
                        case 1:
                            getTarget(0);
                            break;
                    }
                })
                cellList[cell.cellIndex - 2].addEventListener("click", attack)
                cellList = rowList[row.rowIndex - 1].cells;
                cellList[cell.cellIndex - 1].classList.add("target")
                console.log(document.getElementsByClassName("target"))
            }
        }
    }

    event.target.classList.add("selected")


    // console.log(cellList[cell.cellIndex])
    // console.log(cellListUp[cell.cellIndex])
    // console.log(cellListLow[cell.cellIndex])
}

function setUpWhite(event) {
    const cell = event.target.closest('td');
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

    var targets = document.getElementsByClassName("target");
    if (targets.length != 0) {
        for (let i = 0; i <= targets.length; i++) {
            targets[0].classList.remove("target");
            // possibleSquares[0].removeEventListener("click", possibleSquares, true);
        }
    }

    var possibleSquares = document.getElementsByClassName("possible");
    console.log(possibleSquares.length)
    let x = possibleSquares.length;
    if (possibleSquares.length != 0) {
        for (let i = 0; i < x; i++) {
            console.log(i)
            console.log(possibleSquares[0])
            possibleSquares[0].removeEventListener("click", move);
            possibleSquares[0].classList.remove("possible");
            // possibleSquares[0].removeEventListener("click", possibleSquares, true);
        }
    }

    var targetSquares = document.getElementsByClassName("target");
    console.log(targetSquares.length)
    let y = targetSquares.length;
    if (targetSquares.length != 0) {
        for (let i = 0; i < y; i++) {
            console.log(i)
            console.log(targetSquares[0])
            targetSquares[0].removeEventListener("click", move);
            targetSquares[0].classList.remove("possible");
            // possibleSquares[0].removeEventListener("click", possibleSquares, true);
        }
    }

    if (rowList[row.rowIndex - 1] != null) {
        console.log("tedsfwef")
        cellList = rowList[row.rowIndex - 1].cells;
        if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("black")) {
            console.log("black nono up")
        } else if (cellList[cell.cellIndex] != null && cellList[cell.cellIndex].classList.contains("white") && cellList[cell.cellIndex].classList.contains("occupied") && !cellList[cell.cellIndex].children[0].classList.contains("White-Piece")) {
            console.log("yip up")
        }
        if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("black")) {
            console.log("black nono up")
        } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && !cellList[cell.cellIndex + 1].children[0].classList.contains("White-Piece")) {
            console.log("1")
            // cellList[cell.cellIndex + 1].classList.add("target")
            // console.log(document.getElementsByClassName("target"))
            cellList = rowList[row.rowIndex - 2].cells;
            if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                console.log("yippppppp")
                cellList[cell.cellIndex + 2].classList.add("possible")
                cellList[cell.cellIndex + 2].addEventListener("click", function () {
                    // if(document.getElementsByClassName("target").length > 1){
                    //     getTarget(1)
                    //     console.log(document.getElementsByClassName("target").length)
                    // } else {
                    //     getTarget(0)
                    // }
                    console.log("hello")
                    switch (document.getElementsByClassName("target").length) {
                        case 2:
                            console.log("e")
                            getTarget(1)
                            break;
                        case 3:
                            console.log("x")
                            getTarget(1)
                            break;
                        case 4:
                            console.log("b")
                            getTarget(1);
                            break;
                        case 1:
                            console.log("t")
                            getTarget(0);
                            break;
                    }
                })
                cellList[cell.cellIndex + 2].addEventListener("click", attack)
                cellList = rowList[row.rowIndex - 1].cells
                cellList[cell.cellIndex + 1].classList.add("target")
                console.log(document.getElementsByClassName("target"))
            }
        }
        console.log("erwerwerwer")
        cellList = rowList[row.rowIndex - 1].cells;
        if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
            console.log("black nono up")
        } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied") && !cellList[cell.cellIndex - 1].children[0].classList.contains("White-Piece")) {
            console.log("2")
            // cellList[cell.cellIndex - 1].classList.add("target")
            // console.log(document.getElementsByClassName("target"))
            cellList = rowList[row.rowIndex - 2].cells;
            if (!cellList[cell.cellIndex - 2].classList.contains("occupied")) {
                console.log("yippppppp2")
                cellList[cell.cellIndex - 2].classList.add("possible")
                cellList[cell.cellIndex - 2].addEventListener("click", function () {
                    // if(document.getElementsByClassName("target").length < 1){
                    //     getTarget(1)
                    // } else {
                    //     getTarget(0)
                    // }
                    switch (document.getElementsByClassName("target").length) {
                        case 2:
                            getTarget(0)
                            break;
                        case 3:
                            getTarget(0)
                            break;
                        case 4:
                            getTarget(0);
                            break;
                        case 1:
                            getTarget(0);
                            break;
                    }
                })
                cellList[cell.cellIndex - 2].addEventListener("click", attack)
                cellList = rowList[row.rowIndex - 1].cells;
                cellList[cell.cellIndex - 1].classList.add("target")
                console.log(document.getElementsByClassName("target"))
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
        } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white") && cellList[cell.cellIndex + 1].classList.contains("occupied") && !cellList[cell.cellIndex + 1].children[0].classList.contains("White-Piece")) {
            console.log("yip up")
            // cellList[cell.cellIndex - 1].classList.add("target")
            // console.log(document.getElementsByClassName("target"))
            cellList = rowList[row.rowIndex + 2].cells;
            if (!cellList[cell.cellIndex + 2].classList.contains("occupied")) {
                console.log("3")
                cellList[cell.cellIndex + 2].classList.add("possible")
                cellList[cell.cellIndex + 2].addEventListener("click", function () {
                    // if(document.getElementsByClassName("target").length < 1){
                    //     getTarget(1)
                    // } else {
                    //     getTarget(0)
                    // }
                    switch (document.getElementsByClassName("target").length) {
                        case 2:
                            getTarget(1)
                            break;
                        case 3:
                            getTarget(2)
                            break;
                        case 4:
                            getTarget(3);
                            break;
                        case 1:
                            getTarget(0);
                            break;
                    }
                })
                cellList[cell.cellIndex + 2].addEventListener("click", attack)
                cellList = rowList[row.rowIndex + 1].cells;
                cellList[cell.cellIndex + 1].classList.add("target")
                console.log(document.getElementsByClassName("target"))
            }
        } else if (cellList[cell.cellIndex + 1] != null && cellList[cell.cellIndex + 1].classList.contains("white")) {
            console.log("yip low")
            if (!cellList[cell.cellIndex + 1].classList.contains("occupied")) {
                cellList[cell.cellIndex + 1].classList.add("possible")
                cellList[cell.cellIndex + 1].addEventListener("click", move)
            }
        }
        if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("black")) {
            console.log("black nono low")
        } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white") && cellList[cell.cellIndex - 1].classList.contains("occupied") && !cellList[cell.cellIndex - 1].children[0].classList.contains("White-Piece")) {
            console.log("4")
            // cellList[cell.cellIndex - 1].classList.add("target")
            // console.log(document.getElementsByClassName("target"))
            cellList = rowList[row.rowIndex + 2].cells;
            if (!cellList[cell.cellIndex - 2].classList.contains("occupied")) {
                console.log("yippppppp2")
                cellList[cell.cellIndex - 2].classList.add("possible")
                cellList[cell.cellIndex - 2].addEventListener("click", function () {
                    // if(document.getElementsByClassName("target").length < 1){
                    //     getTarget(1)
                    // } else {
                    //     getTarget(0)
                    // }
                    switch (document.getElementsByClassName("target").length) {
                        case 2:
                            getTarget(1)
                            break;
                        case 3:
                            getTarget(2)
                            break;
                        case 4:
                            getTarget(2);
                            break;
                        case 1:
                            getTarget(0);
                            break;
                    }
                })
                cellList[cell.cellIndex - 2].addEventListener("click", attack)
                cellList = rowList[row.rowIndex + 1].cells;
                cellList[cell.cellIndex - 1].classList.add("target")
                console.log(document.getElementsByClassName("target"))
            }
        } else if (cellList[cell.cellIndex - 1] != null && cellList[cell.cellIndex - 1].classList.contains("white")) {
            console.log("yip low")
            if (!cellList[cell.cellIndex - 1].classList.contains("occupied")) {
                cellList[cell.cellIndex - 1].classList.add("possible")
                cellList[cell.cellIndex - 1].addEventListener("click", move)
            }
        }
    }
    console.log(event.target)
    event.target.classList.add("selected")
    // console.log(cellList[cell.cellIndex])
    // console.log(cellListUp[cell.cellIndex])
    // console.log(cellListLow[cell.cellIndex])
    console.log("length:" + document.getElementsByClassName("target").length)
}

function move(event) {
    // console.log("code            " + event + "                   " + document.getElementsByClassName("selected")[0].parentElement)
    document.getElementsByClassName("selected")[0].parentElement.classList.remove("occupied")
    event.target.appendChild(document.getElementsByClassName("selected")[0])
    event.target.classList.add("occupied")
    var possibleSquares = document.getElementsByClassName("possible");
    console.log(possibleSquares.length)
    let x = possibleSquares.length;
    if (possibleSquares.length != 0) {
        for (let i = 0; i < x; i++) {
            console.log(i)
            console.log(possibleSquares[0])
            possibleSquares[0].removeEventListener("click", move);
            possibleSquares[0].classList.remove("possible");
            // possibleSquares[0].removeEventListener("click", possibleSquares, true);
        }
    }
}

function getTarget(index) {
    console.log("index: " + index + "-------------- target: " + target)
    target = index;
    return target;
}

function attack(event) {
    console.log(target)
    console.log("code            " + event + "                   " + document.getElementsByClassName("selected")[0].parentElement)
    document.getElementsByClassName("selected")[0].parentElement.classList.remove("occupied")
    event.target.appendChild(document.getElementsByClassName("selected")[0])
    event.target.classList.add("occupied")
    var possibleSquares = document.getElementsByClassName("possible");
    console.log(possibleSquares.length)
    console.log(document.getElementsByClassName("target")[target])
    document.getElementsByClassName("target")[target].children[0].parentElement.classList.remove("occupied")
    document.getElementsByClassName("target")[target].children[0].remove()
    let x = possibleSquares.length;
    if (possibleSquares.length != 0) {
        for (let i = 0; i < x; i++) {
            console.log(i)
            console.log(possibleSquares[0])
            possibleSquares[0].removeEventListener("click", attack);
            possibleSquares[0].classList.remove("possible");
            // possibleSquares[0].removeEventListener("click", possibleSquares, true);
        }
    }
    // console.log("code            " + event + "           " + event.target.cellIndex + "        " + document.getElementsByClassName("selected")[0].parentElement)
    // console.log(event.target.parentElement.rowIndex)
    // let row = rowList[event.target.parentElement.rowIndex + 1]
    // let cel = row.querySelectorAll("td")[event.target.cellIndex + 1].children[0]
    // console.log(cel)
    // console.log(row)
    // cel.classList.add("target")
    // document.getElementsByClassName("selected")[0].parentElement.classList.remove("occupied")
    // event.target.appendChild(document.getElementsByClassName("selected")[0])
    // document.getElementsByClassName('target')[0].parentElement.classList.remove('occupied')
    // document.getElementsByClassName('target')[0].remove();
    // event.target.classList.add("occupied")
    // var possibleSquares = document.getElementsByClassName("possible");
    // console.log(possibleSquares.length)
    // let x = possibleSquares.length;
    // if (possibleSquares.length != 0) {
    //     for (let i = 0; i < x; i++) {
    //         console.log(i)
    //         console.log(possibleSquares[0])
    //         possibleSquares[0].removeEventListener("click", move);
    //         possibleSquares[0].classList.remove("possible");
    //         // possibleSquares[0].removeEventListener("click", possibleSquares, true);
    //     }
    // }
}