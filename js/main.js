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
            if ((grid[0] + grid[1] + grid[2] === 3) || (grid[0] + grid[1] + grid[2] === 6)) {
                endGame(currentPlayer,winText,turnText);
                let case1 = document.getElementById("0");
                let case2 = document.getElementById("1");
                let case3 = document.getElementById("2");
                changeBg(case1,case2,case3);
            };
            if ((grid[3] + grid[4] + grid[5] === 3) || (grid[3] + grid[4] + grid[5] === 6)) {
                endGame(currentPlayer,winText,turnText);
                let case1 = document.getElementById("3");
                let case2 = document.getElementById("4");
                let case3 = document.getElementById("5");
                changeBg(case1,case2,case3);
            };
            if ((grid[6] + grid[7] + grid[8] === 3) || (grid[6] + grid[7] + grid[8] === 6)) {
                endGame(currentPlayer,winText,turnText);
                let case1 = document.getElementById("6");
                let case2 = document.getElementById("7");
                let case3 = document.getElementById("8");
                changeBg(case1,case2,case3);
            };
            if ((grid[0] + grid[3] + grid[6] === 3) || (grid[0] + grid[3] + grid[6] === 6)) {
                endGame(currentPlayer,winText,turnText);
                let case1 = document.getElementById("0");
                let case2 = document.getElementById("3");
                let case3 = document.getElementById("6");
                changeBg(case1,case2,case3);
            };
            if ((grid[1] + grid[4] + grid[7] === 3) || (grid[1] + grid[4] + grid[7] === 6)) {
                endGame(currentPlayer,winText,turnText);
                let case1 = document.getElementById("1");
                let case2 = document.getElementById("4");
                let case3 = document.getElementById("7");
                changeBg(case1,case2,case3);
            };
            if ((grid[2] + grid[5] + grid[8] === 3) || (grid[2] + grid[5] + grid[8] === 6)) {
                endGame(currentPlayer,winText,turnText);
                let case1 = document.getElementById("2");
                let case2 = document.getElementById("5");
                let case3 = document.getElementById("8");
                changeBg(case1,case2,case3);
            };
            if ((grid[0] + grid[4] + grid[8] === 3) || (grid[0] + grid[4] + grid[8] === 6)) {
                endGame(currentPlayer,winText,turnText);
                let case1 = document.getElementById("0");
                let case2 = document.getElementById("4");
                let case3 = document.getElementById("8");
                changeBg(case1,case2,case3);
            };
            if ((grid[2] + grid[4] + grid[6] === 3) || (grid[2] + grid[4] + grid[6] === 6)) {
                endGame(currentPlayer,winText,turnText);
                let case1 = document.getElementById("2");
                let case2 = document.getElementById("4");
                let case3 = document.getElementById("6");
                changeBg(case1,case2,case3);
            };
            if (listCases.length == 0) {
                turnText.innerHTML = " ";
                winText.innerHTML = "ÉGALITÉ !";
            };
        };
        // ###### TEST CLICK & ACTIONS OF GAME ######
        getCase.onclick = function() {
            grid[getCase.id] = currentPlayer;
            let index = iaPoss.indexOf(getCase.id);
            iaPoss.splice(index, 1);
            // ###### PLAYER 1 ######
            if (currentPlayer === 1 && getCase.childNodes.length === 0) {
                this.innerHTML = "X";
                gridP1.push(getCase.id);
                this.setAttribute("class","col done");
                listCases = document.getElementsByClassName("case");
                turnText.innerHTML = "C'est à O de Jouer !";
                testEnd(turnText);
                currentPlayer ++;
            
            // ###### AI DIFFICULTY ######
                easy(iaPoss,testEnd,gridP2,listCases,turnText,grid);
            // ###### PLAYER 2 ######
            } else if (currentPlayer === 2 && getCase.childNodes.length === 0) {
                // secondPlayer(getCase,testEnd,gridP2,listCases,turnText);
            };
        };
    };
};

function easy(iaPoss,testEnd,gridP2,listCases,turnText,grid) {
    let iaPlay = Math.floor(Math.random() * iaPoss.length);
    let getClass = document.getElementsByClassName(iaPoss[iaPlay])[0];
    if (getClass.childNodes.length === 0) {
        let index = iaPoss.indexOf(getClass.id);
        grid[getClass.id] = currentPlayer;
        iaPoss.splice(index, 1);
        getClass.innerHTML = "O";
        gridP2.push(getClass.id);
        getClass.setAttribute("class","col done");
        listCases = document.getElementsByClassName("case");
        turnText.innerHTML = "C'est à X de Jouer !";
        testEnd();
    };
    return currentPlayer--, gridP2, listCases, turnText, grid;

};

function secondPlayer(getCase,testEnd,gridP2,listCases,turnText) {
    getCase.innerHTML = "O";
    gridP2.push(getCase.id);
    getCase.setAttribute("class","col done");
    listCases = document.getElementsByClassName("case");
    turnText.innerHTML = "C'est à X de Jouer !";
    testEnd();
    return currentPlayer--, gridP2, listCases, turnText;
}

function endGame(currentPlayer,winText,turnText) {
    // winText.innerHTML = `Joueur ${currentPlayer} Gagne !`;
    if (currentPlayer === 1) {
        winText.innerHTML = "Vous avez gagné !";
    } else {
        winText.innerHTML = "Vous avez perdu !";
    };
    turnText.innerHTML = " ";
    let lastCases = document.getElementsByClassName("case");
    for(let lastCase of lastCases) {
        lastCase.innerHTML = " ";
        lastCase.setAttribute("class","col case");
    };
};
function changeBg(case1,case2,case3) {
    case1.classList.add("bg-win");
    case2.classList.add("bg-win");
    case3.classList.add("bg-win");
}
// ###### LAUNCH GAME ON LOADING PAGE ######
game();
