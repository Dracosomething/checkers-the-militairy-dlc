var turn = "white";

class stone {
    constructor() {}

    target;


    move(event) {
        document.getElementsByClassName("selected")[0].parentElement.classList.remove("occupied")
        event.target.appendChild(document.getElementsByClassName("selected")[0])
        event.target.classList.add("occupied")
        var possibleSquares = document.getElementsByClassName("possible");
        let x = possibleSquares.length;
        if (possibleSquares.length != 0) {
            for (let i = 0; i < x; i++) {
                possibleSquares[0].removeEventListener("click", piece.move);
                possibleSquares[0].classList.remove("possible");
            }
        }
        turn = turn == "black"? "white":"black"
        player.children[0].innerHTML = turn
    }

    attack(event) {
        document.getElementsByClassName("selected")[0].parentElement.classList.remove("occupied")
        event.target.appendChild(document.getElementsByClassName("selected")[0])
        event.target.classList.add("occupied")
        var possibleSquares = document.getElementsByClassName("possible");
        document.getElementsByClassName("target")[target].children[0].parentElement.classList.remove("occupied")
        document.getElementsByClassName("target")[target].children[0].remove()
        let x = possibleSquares.length;
        if (possibleSquares.length != 0) {
            for (let i = 0; i < x; i++) {
                possibleSquares[0].removeEventListener("click", piece.attack);
                possibleSquares[0].classList.remove("possible");
            }
        }
        turn = turn == "black"? "white":"black"
        player.children[0].innerHTML = turn 
    }
}