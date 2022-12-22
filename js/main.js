function game() {
    // ###### RESET ######
    let listAllCases = document.getElementsByClassName("col");
    let index = 0; 
    for(let getCase of listAllCases) {
        getCase.setAttribute("class","col case");
        getCase.innerHTML = "";
        getCase.classList.add(index);
        index++;
    };

    // ###### INITIALISATION ######
    let currentPlayer = 1;
    let gridP1 = [];
    let gridP2 = [];
    let grid = [];
    let listCases = document.getElementsByClassName("case");
    let winText = document.getElementById("winText");
    let turnText = document.getElementById("turnText");
    turnText.innerHTML = "C'est à X de Jouer !";
    winText.innerHTML = "";

    // ###### LOOP GAME ######
    for(let getCase of listCases) {
        // ###### TEST END CONDITIONS ######
        function testEnd() {
            if ((grid[0] + grid[1] + grid[2] === 3) || (grid[0] + grid[1] + grid[2] === 6) ||
                (grid[3] + grid[4] + grid[5] === 3) || (grid[3] + grid[4] + grid[5] === 6) ||
                (grid[6] + grid[7] + grid[8] === 3) || (grid[6] + grid[7] + grid[8] === 6) ||
                (grid[0] + grid[3] + grid[6] === 3) || (grid[0] + grid[3] + grid[6] === 6) ||
                (grid[1] + grid[4] + grid[7] === 3) || (grid[1] + grid[4] + grid[7] === 6) ||
                (grid[2] + grid[5] + grid[8] === 3) || (grid[2] + grid[5] + grid[8] === 6) ||
                (grid[0] + grid[4] + grid[8] === 3) || (grid[0] + grid[4] + grid[8] === 6) ||
                (grid[2] + grid[4] + grid[6] === 3) || (grid[2] + grid[4] + grid[6] === 6)) {
                    winText.innerHTML = `Joueur ${currentPlayer} Gagne !`;
                    turnText.innerHTML = " ";
                    let lastCases = document.getElementsByClassName("case");
                    for(let lastCase of lastCases) {
                    lastCase.innerHTML = " "; };}
            else if (listCases.length == 0) {
                winText.innerHTML = "ÉGALITÉ !";
            };
        };
        // ###### TEST CLICK & ACTION THE GAME ######
        getCase.onclick = function() {
            grid[getCase.classList[2]] = currentPlayer;
            console.log(grid);
            if (currentPlayer === 1 && getCase.childNodes.length === 0) {
                this.innerHTML = "X";
                gridP1.push(getCase.classList[2]);
                this.setAttribute("class","col done");
                listCases = document.getElementsByClassName("case");
                turnText.innerHTML = "C'est à O de Jouer !";
                testEnd();
                currentPlayer ++;
                
            } else if (currentPlayer === 2 && getCase.childNodes.length === 0) {
                this.innerHTML = "O";
                gridP2.push(getCase.classList[2]);
                this.setAttribute("class","col done");
                listCases = document.getElementsByClassName("case");
                turnText.innerHTML = "C'est à X de Jouer !";
                testEnd();
                currentPlayer --;
            };
        };
    };
};

game();

