var currentPlayer = 1;
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
    let gridP1 = [];
    let gridP2 = [];
    let grid = [];
    let iaPoss = [];
    currentPlayer = 1;
    let listCases = document.getElementsByClassName("case");
    let winText = document.getElementById("winText");
    let turnText = document.getElementById("turnText");
    iaPoss =['0','1','2','3','4','5','6','7','8'];
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
        // ###### TEST CLICK & ACTIONS OF GAME ######
        getCase.onclick = function() {
            grid[getCase.classList[2]] = currentPlayer;
            console.log(grid);
            let index = iaPoss.indexOf(getCase.classList[2]);
            iaPoss.splice(index, 1);
            // ###### PLAYER 1 ######
            if (currentPlayer === 1 && getCase.childNodes.length === 0) {
                this.innerHTML = "X";
                gridP1.push(getCase.classList[2]);
                this.setAttribute("class","col done");
                listCases = document.getElementsByClassName("case");
                turnText.innerHTML = "C'est à O de Jouer !";
                testEnd();
                currentPlayer ++;
                
                easy(iaPoss,testEnd,gridP2,listCases,turnText,grid);
            // ###### PLAYER 2 ######
            } else if (currentPlayer === 2 && getCase.childNodes.length === 0) {
                // secondPlayer(getCase,testEnd,gridP2,listCases,turnText);
            };
        };
    };
};

function easy(iaPoss,testEnd,gridP2,listCases,turnText,grid) {
    console.log(`Possibilité restantes : ${iaPoss}`);
    let iaPlay = Math.floor(Math.random() * iaPoss.length);
    console.log(`Chiffre récupéré : ${iaPoss[iaPlay]}`);
    let getClass = document.getElementsByClassName(iaPoss[iaPlay])[0];
    if (getClass.childNodes.length === 0) {
    let index = iaPoss.indexOf(getClass.classList[2]);
    grid[getClass.classList[2]] = currentPlayer;
    iaPoss.splice(index, 1);
    getClass.innerHTML = "O";
    gridP2.push(getClass.classList[2]);
    getClass.setAttribute("class","col done");
    listCases = document.getElementsByClassName("case");
    turnText.innerHTML = "C'est à X de Jouer !";
    console.log(`Possibilité restantes : ${iaPoss}`);
    testEnd();
    currentPlayer --; };
    return currentPlayer, gridP2, listCases, turnText, grid;

};

function secondPlayer(getCase,testEnd,gridP2,listCases,turnText) {
    getCase.innerHTML = "O";
    gridP2.push(getCase.classList[2]);
    getCase.setAttribute("class","col done");
    listCases = document.getElementsByClassName("case");
    turnText.innerHTML = "C'est à X de Jouer !";
    testEnd();
    currentPlayer --;
    return currentPlayer, gridP2, listCases, turnText;
}


// ###### LAUNCH GAME ON LOADING PAGE ######
game();
