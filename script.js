var whitePieces = document.getElementsByClassName("startposWhite")
var blackPieces = document.getElementsByClassName("startposBlack")
var BlackSquares = document.getElementsByClassName("black")
var WhiteSquares = document.getElementsByClassName("white")

let generateButton = document.getElementById("generateButton")

const rowList = document.querySelectorAll("table tr")

function generateField() {
    // let white = document.createElement('img');
    // white.src='assets/stone-white.png';
    for (let i = 0; i < whitePieces.length; i++) {
        let white = document.createElement('img');
        white.src = 'assets/stone-white.png';
        white.className = "White-Piece"
        let whitePiece = whitePieces[i];
        whitePiece.addEventListener("click", function (e) {
            const cell = e.target.closest('td');
            if (!cell) { return; }
            const row = cell.parentElement;
            console.log(cell.innerHTML, row.rowIndex, cell.cellIndex);
            console.log(rowList[row.rowIndex])
            const cellList = rowList[row.rowIndex + 1].cells;
            console.log(cellList[cell.cellIndex])
            if(cellList[cell.cellIndex].className == "black"){
                console.log("black nono")
            }
        })
        // console.log(whitePiece + "     " + i)
        whitePiece.appendChild(white)
    }
    for (let i = 0; i < blackPieces.length; i++) {
        let black = document.createElement('img');
        black.src = 'assets/stone-black.png';
        black.className = "Black-Piece"
        let blackPiece = blackPieces[i];
        blackPiece.addEventListener("click", function (e) {
            const cell = e.target.closest('td');
            if (!cell) { return; }
            const row = cell.parentElement;
            console.log(cell.innerHTML, row.rowIndex, cell.cellIndex);
        })
        // console.log(whitePiece + "     " + i)
        blackPiece.appendChild(black)
    }
    generateButton.setAttribute('disabled', 'false');
}