var currentPlayer = 1;
var difficulty = "";
let gameDiv = document.getElementById("game");
gameDiv.setAttribute("class","hidemenu");

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
    turnText.classList.remove("winMessage", "loseMessage");


    // ###### LOOP GAME ######
    for(let getCase of listCases) {
        // ############ TEST END CONDITIONS ##############
        function testEnd() {
            if (listCases.length == 0) {
                turnText.innerHTML = "ÉGALITÉ !";
            };
            if ((grid[0] + grid[1] + grid[2] === 3) || (grid[0] + grid[1] + grid[2] === 6)) {
                endGame(currentPlayer,turnText);
                let case1 = document.getElementById("0");
                let case2 = document.getElementById("1");
                let case3 = document.getElementById("2");
                changeBg(case1,case2,case3,turnText);
            };
            if ((grid[3] + grid[4] + grid[5] === 3) || (grid[3] + grid[4] + grid[5] === 6)) {
                endGame(currentPlayer,turnText);
                let case1 = document.getElementById("3");
                let case2 = document.getElementById("4");
                let case3 = document.getElementById("5");
                changeBg(case1,case2,case3,turnText);
            };
            if ((grid[6] + grid[7] + grid[8] === 3) || (grid[6] + grid[7] + grid[8] === 6)) {
                endGame(currentPlayer,turnText);
                let case1 = document.getElementById("6");
                let case2 = document.getElementById("7");
                let case3 = document.getElementById("8");
                changeBg(case1,case2,case3,turnText);
            };
            if ((grid[0] + grid[3] + grid[6] === 3) || (grid[0] + grid[3] + grid[6] === 6)) {
                endGame(currentPlayer,turnText);
                let case1 = document.getElementById("0");
                let case2 = document.getElementById("3");
                let case3 = document.getElementById("6");
                changeBg(case1,case2,case3,turnText);
            };
            if ((grid[1] + grid[4] + grid[7] === 3) || (grid[1] + grid[4] + grid[7] === 6)) {
                endGame(currentPlayer,turnText);
                let case1 = document.getElementById("1");
                let case2 = document.getElementById("4");
                let case3 = document.getElementById("7");
                changeBg(case1,case2,case3,turnText);
            };
            if ((grid[2] + grid[5] + grid[8] === 3) || (grid[2] + grid[5] + grid[8] === 6)) {
                endGame(currentPlayer,turnText);
                let case1 = document.getElementById("2");
                let case2 = document.getElementById("5");
                let case3 = document.getElementById("8");
                changeBg(case1,case2,case3,turnText);
            };
            if ((grid[0] + grid[4] + grid[8] === 3) || (grid[0] + grid[4] + grid[8] === 6)) {
                endGame(currentPlayer,turnText);
                let case1 = document.getElementById("0");
                let case2 = document.getElementById("4");
                let case3 = document.getElementById("8");
                changeBg(case1,case2,case3,turnText);
            };
            if ((grid[2] + grid[4] + grid[6] === 3) || (grid[2] + grid[4] + grid[6] === 6)) {
                endGame(currentPlayer,turnText);
                let case1 = document.getElementById("2");
                let case2 = document.getElementById("4");
                let case3 = document.getElementById("6");
                changeBg(case1,case2,case3,turnText);
            };
        };
        // ###### TEST CLICK & ACTIONS OF GAME ######
        getCase.onclick = function() {
            grid[getCase.id] = currentPlayer;
            let index = iaPoss.indexOf(getCase.id);
            iaPoss.splice(index, 1);
            // ############ PLAYER 1 ############
            if (currentPlayer === 1 && getCase.childNodes.length === 0) {
                this.innerHTML = "X";
                gridP1.push(getCase.id);
                this.setAttribute("class","col done");
                listCases = document.getElementsByClassName("case");
                turnText.innerHTML = "C'est à O de Jouer !";
                testEnd(turnText);
                currentPlayer ++;
            
            // ###### AI DIFFICULTY ######
            if (difficulty === 'easy') {
                easy(iaPoss,testEnd,gridP2,listCases,turnText,grid);
            };
            if (difficulty === 'normal') {
                medium(iaPoss,testEnd,gridP1,gridP2,listCases,turnText,grid);
            };
            if (difficulty === 'hard') {
                hard(iaPoss,testEnd,gridP1,gridP2,listCases,turnText,grid);
            };
            // ########### PLAYER 2 ############
            } else if (currentPlayer === 2 && getCase.childNodes.length === 0) {
                // secondPlayer(getCase,testEnd,gridP2,listCases,turnText);
            };
        };
    };
};
// ################ EASY #######################
function easy(iaPoss,testEnd,gridP2,listCases,turnText,grid) {
    let iaPlay = Math.floor(Math.random() * iaPoss.length);
    iaPlay = iaPlay.toString();
    let getClass = document.getElementById(iaPoss[iaPlay])[0];
    console.log(iaPoss);
    console.log(iaPlay);
    console.log(getClass);
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
// ################ MEDIUM #######################
function medium(iaPoss,testEnd,gridP1,gridP2,listCases,turnText,grid) {
    let iaPlay = Math.floor(Math.random() * iaPoss.length);
    let getClass = document.getElementById(iaPoss[iaPlay]);
    let allClass =[]
    for(i=0; i <=8; i++) {
        allClass[i] = document.getElementById(i);
    };
    // ################ CHECK IF PLAYER CAN WIN #######################
    if (gridP1.includes('0') && gridP1.includes('1') && allClass[2].childNodes.length === 0||
        gridP1.includes('5') && gridP1.includes('8') && allClass[2].childNodes.length === 0||
        gridP1.includes('4') && gridP1.includes('6') && allClass[2].childNodes.length === 0)
        { getClass = document.getElementsByClassName('2')[0]; };
    if (gridP1.includes('3') && gridP1.includes('6') && allClass[0].childNodes.length === 0||
        gridP1.includes('1') && gridP1.includes('2') && allClass[0].childNodes.length === 0||
        gridP1.includes('4') && gridP1.includes('8') && allClass[0].childNodes.length === 0)
        { getClass = document.getElementById('0'); };
    if (gridP1.includes('0') && gridP1.includes('3') && allClass[6].childNodes.length === 0||
        gridP1.includes('7') && gridP1.includes('8') && allClass[6].childNodes.length === 0||
        gridP1.includes('4') && gridP1.includes('2') && allClass[6].childNodes.length === 0)
        { getClass = document.getElementById('6'); };
    if (gridP1.includes('2') && gridP1.includes('5') && allClass[8].childNodes.length === 0||
        gridP1.includes('6') && gridP1.includes('7') && allClass[8].childNodes.length === 0||
        gridP1.includes('4') && gridP1.includes('0') && allClass[8].childNodes.length === 0)
        { getClass = document.getElementById('8'); };
    if (gridP1.includes('0') && gridP1.includes('2') && allClass[1].childNodes.length === 0||
        gridP1.includes('4') && gridP1.includes('7') && allClass[1].childNodes.length === 0)
        { getClass = document.getElementById('1'); };
    if (gridP1.includes('0') && gridP1.includes('6') && allClass[3].childNodes.length === 0||
        gridP1.includes('4') && gridP1.includes('5') && allClass[3].childNodes.length === 0)
        { getClass = document.getElementById('3'); };
    if (gridP1.includes('2') && gridP1.includes('8') && allClass[5].childNodes.length === 0||
        gridP1.includes('4') && gridP1.includes('3') && allClass[5].childNodes.length === 0)
        { getClass = document.getElementById('5'); };
    if (gridP1.includes('6') && gridP1.includes('8') && allClass[7].childNodes.length === 0||
        gridP1.includes('4') && gridP1.includes('1') && allClass[7].childNodes.length === 0)
        { getClass = document.getElementById('7'); };
    if (gridP1.includes('0') && gridP1.includes('8') && allClass[4].childNodes.length === 0||
        gridP1.includes('1') && gridP1.includes('7') && allClass[4].childNodes.length === 0||
        gridP1.includes('2') && gridP1.includes('6') && allClass[4].childNodes.length === 0||
        gridP1.includes('3') && gridP1.includes('5') && allClass[4].childNodes.length === 0)
        { getClass = document.getElementById('4'); };

    // ################ CHECK IF IA CAN WIN #######################
    if (gridP2.includes('0') && gridP2.includes('1') && allClass[2].childNodes.length === 0||
        gridP2.includes('5') && gridP2.includes('8') && allClass[2].childNodes.length === 0||
        gridP2.includes('4') && gridP2.includes('6') && allClass[2].childNodes.length === 0)
        { getClass = document.getElementsByClassName('2')[0]; };
    if (gridP2.includes('3') && gridP2.includes('6') && allClass[0].childNodes.length === 0||
        gridP2.includes('1') && gridP2.includes('2') && allClass[0].childNodes.length === 0||
        gridP2.includes('4') && gridP2.includes('8') && allClass[0].childNodes.length === 0)
        { getClass = document.getElementById('0'); };
    if (gridP2.includes('0') && gridP2.includes('3') && allClass[6].childNodes.length === 0||
        gridP2.includes('7') && gridP2.includes('8') && allClass[6].childNodes.length === 0||
        gridP2.includes('4') && gridP2.includes('2') && allClass[6].childNodes.length === 0)
        { getClass = document.getElementById('6'); };
    if (gridP2.includes('2') && gridP2.includes('5') && allClass[8].childNodes.length === 0||
        gridP2.includes('6') && gridP2.includes('7') && allClass[8].childNodes.length === 0||
        gridP2.includes('4') && gridP2.includes('0') && allClass[8].childNodes.length === 0)
        { getClass = document.getElementById('8'); };
    if (gridP2.includes('0') && gridP2.includes('2') && allClass[1].childNodes.length === 0||
        gridP2.includes('4') && gridP2.includes('7') && allClass[1].childNodes.length === 0)
        { getClass = document.getElementById('1'); };
    if (gridP2.includes('0') && gridP2.includes('6') && allClass[3].childNodes.length === 0||
        gridP2.includes('4') && gridP2.includes('5') && allClass[3].childNodes.length === 0)
        { getClass = document.getElementById('3'); };
    if (gridP2.includes('2') && gridP2.includes('8') && allClass[5].childNodes.length === 0||
        gridP2.includes('4') && gridP2.includes('3') && allClass[5].childNodes.length === 0)
        { getClass = document.getElementById('5'); };
    if (gridP2.includes('6') && gridP2.includes('8') && allClass[7].childNodes.length === 0||
        gridP2.includes('4') && gridP2.includes('1') && allClass[7].childNodes.length === 0)
        { getClass = document.getElementById('7'); };
    if (gridP2.includes('0') && gridP2.includes('8') && allClass[4].childNodes.length === 0||
        gridP2.includes('1') && gridP2.includes('7') && allClass[4].childNodes.length === 0||
        gridP2.includes('2') && gridP2.includes('6') && allClass[4].childNodes.length === 0||
        gridP2.includes('3') && gridP2.includes('5') && allClass[4].childNodes.length === 0)
        { getClass = document.getElementById('4'); };

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
// ################ HARD #######################
function hard(iaPoss,testEnd,gridP1,gridP2,listCases,turnText,grid) {
    let iaPlay = Math.floor(Math.random() * iaPoss.length);
    let getClass = document.getElementById(iaPoss[iaPlay]);
    let allClass =[]
    for(i=0; i <=8; i++) {
        allClass[i] = document.getElementById(i);
    };
    // ################ CHECK IF PLAYER CAN WIN #######################
    if (gridP1.includes('0') && allClass[4].childNodes.length === 0||
        gridP1.includes('2') && allClass[4].childNodes.length === 0||
        gridP1.includes('6') && allClass[4].childNodes.length === 0||
        gridP1.includes('8') && allClass[4].childNodes.length === 0)
        { getClass = document.getElementsByClassName('4')[0]; };
    if (gridP1.includes('4') && allClass[0].childNodes.length === 0||
        gridP1.includes('1') && allClass[0].childNodes.length === 0||
        gridP1.includes('3') && allClass[0].childNodes.length === 0||
        gridP1.includes('5') && allClass[0].childNodes.length === 0||
        gridP1.includes('7') && allClass[0].childNodes.length === 0)
        { getClass = document.getElementsByClassName('0')[0];};
    if (gridP1.includes('4') && gridP1.includes('8') && allClass[2].childNodes.length === 0)
        { getClass = document.getElementsByClassName('2')[0];};
    if (gridP1.includes('3') && gridP1.includes('7') && allClass[2].childNodes.length === 0||
        gridP1.includes('5') && gridP1.includes('7') && allClass[2].childNodes.length === 0)
        { getClass = document.getElementsByClassName('2')[0];}
    if (gridP1.includes('0') && gridP1.includes('1') && allClass[2].childNodes.length === 0||
        gridP1.includes('5') && gridP1.includes('8') && allClass[2].childNodes.length === 0||
        gridP1.includes('4') && gridP1.includes('6') && allClass[2].childNodes.length === 0)
        { getClass = document.getElementsByClassName('2')[0]; };
    if (gridP1.includes('3') && gridP1.includes('6') && allClass[0].childNodes.length === 0||
        gridP1.includes('1') && gridP1.includes('2') && allClass[0].childNodes.length === 0||
        gridP1.includes('4') && gridP1.includes('8') && allClass[0].childNodes.length === 0)
        { getClass = document.getElementById('0'); };
    if (gridP1.includes('0') && gridP1.includes('3') && allClass[6].childNodes.length === 0||
        gridP1.includes('7') && gridP1.includes('8') && allClass[6].childNodes.length === 0||
        gridP1.includes('4') && gridP1.includes('2') && allClass[6].childNodes.length === 0)
        { getClass = document.getElementById('6'); };
    if (gridP1.includes('2') && gridP1.includes('5') && allClass[8].childNodes.length === 0||
        gridP1.includes('6') && gridP1.includes('7') && allClass[8].childNodes.length === 0||
        gridP1.includes('4') && gridP1.includes('0') && allClass[8].childNodes.length === 0)
        { getClass = document.getElementById('8'); };
    if (gridP1.includes('0') && gridP1.includes('2') && allClass[1].childNodes.length === 0||
        gridP1.includes('4') && gridP1.includes('7') && allClass[1].childNodes.length === 0)
        { getClass = document.getElementById('1'); };
    if (gridP1.includes('0') && gridP1.includes('6') && allClass[3].childNodes.length === 0||
        gridP1.includes('4') && gridP1.includes('5') && allClass[3].childNodes.length === 0)
        { getClass = document.getElementById('3'); };
    if (gridP1.includes('2') && gridP1.includes('8') && allClass[5].childNodes.length === 0||
        gridP1.includes('4') && gridP1.includes('3') && allClass[5].childNodes.length === 0)
        { getClass = document.getElementById('5'); };
    if (gridP1.includes('6') && gridP1.includes('8') && allClass[7].childNodes.length === 0||
        gridP1.includes('4') && gridP1.includes('1') && allClass[7].childNodes.length === 0)
        { getClass = document.getElementById('7'); };
    if (gridP1.includes('0') && gridP1.includes('8') && allClass[4].childNodes.length === 0||
        gridP1.includes('1') && gridP1.includes('7') && allClass[4].childNodes.length === 0||
        gridP1.includes('2') && gridP1.includes('6') && allClass[4].childNodes.length === 0||
        gridP1.includes('3') && gridP1.includes('5') && allClass[4].childNodes.length === 0)
        { getClass = document.getElementById('4'); };

    // ################ CHECK IF IA CAN WIN #######################
    if (gridP2.includes('0') && gridP2.includes('1') && allClass[2].childNodes.length === 0||
        gridP2.includes('5') && gridP2.includes('8') && allClass[2].childNodes.length === 0||
        gridP2.includes('4') && gridP2.includes('6') && allClass[2].childNodes.length === 0)
        { getClass = document.getElementsByClassName('2')[0]; };
    if (gridP2.includes('3') && gridP2.includes('6') && allClass[0].childNodes.length === 0||
        gridP2.includes('1') && gridP2.includes('2') && allClass[0].childNodes.length === 0||
        gridP2.includes('4') && gridP2.includes('8') && allClass[0].childNodes.length === 0)
        { getClass = document.getElementById('0'); };
    if (gridP2.includes('0') && gridP2.includes('3') && allClass[6].childNodes.length === 0||
        gridP2.includes('7') && gridP2.includes('8') && allClass[6].childNodes.length === 0||
        gridP2.includes('4') && gridP2.includes('2') && allClass[6].childNodes.length === 0)
        { getClass = document.getElementById('6'); };
    if (gridP2.includes('2') && gridP2.includes('5') && allClass[8].childNodes.length === 0||
        gridP2.includes('6') && gridP2.includes('7') && allClass[8].childNodes.length === 0||
        gridP2.includes('4') && gridP2.includes('0') && allClass[8].childNodes.length === 0)
        { getClass = document.getElementById('8'); };
    if (gridP2.includes('0') && gridP2.includes('2') && allClass[1].childNodes.length === 0||
        gridP2.includes('4') && gridP2.includes('7') && allClass[1].childNodes.length === 0)
        { getClass = document.getElementById('1'); };
    if (gridP2.includes('0') && gridP2.includes('6') && allClass[3].childNodes.length === 0||
        gridP2.includes('4') && gridP2.includes('5') && allClass[3].childNodes.length === 0)
        { getClass = document.getElementById('3'); };
    if (gridP2.includes('2') && gridP2.includes('8') && allClass[5].childNodes.length === 0||
        gridP2.includes('4') && gridP2.includes('3') && allClass[5].childNodes.length === 0)
        { getClass = document.getElementById('5'); };
    if (gridP2.includes('6') && gridP2.includes('8') && allClass[7].childNodes.length === 0||
        gridP2.includes('4') && gridP2.includes('1') && allClass[7].childNodes.length === 0)
        { getClass = document.getElementById('7'); };
    if (gridP2.includes('0') && gridP2.includes('8') && allClass[4].childNodes.length === 0||
        gridP2.includes('1') && gridP2.includes('7') && allClass[4].childNodes.length === 0||
        gridP2.includes('2') && gridP2.includes('6') && allClass[4].childNodes.length === 0||
        gridP2.includes('3') && gridP2.includes('5') && allClass[4].childNodes.length === 0)
        { getClass = document.getElementById('4'); };

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

function endGame(currentPlayer,turnText) {
    // turnText.innerHTML = `Joueur ${currentPlayer} Gagne !`;
    if (currentPlayer === 1) {
        turnText.innerHTML = "Vous avez gagné !";
    } else {
        turnText.innerHTML = "Vous avez perdu !";
    };
    let lastCases = document.getElementsByClassName("case");
    for(let lastCase of lastCases) {
        lastCase.innerHTML = " ";
        lastCase.setAttribute("class","col case");
    };
};
function changeBg(case1,case2,case3,turnText) {
    if (currentPlayer == 1) {
        case1.classList.add("bg-win");
        case2.classList.add("bg-win");
        case3.classList.add("bg-win");
        turnText.classList.remove("loseMessage");
        turnText.classList.add("winMessage");
    }
    if (currentPlayer == 2) {
        case1.classList.add("bg-lose");
        case2.classList.add("bg-lose");
        case3.classList.add("bg-lose");
        turnText.classList.remove("winMessage");
        turnText.classList.add("loseMessage");
    }

}
// ###### LAUNCH GAME ######
function restart() {
    let menu = document.getElementsByClassName("hidemenu")[0];
    menu.setAttribute("class","menu");
    gameDiv.setAttribute("class","hidemenu");
};
function start(difficultySelect) {
    difficulty = difficultySelect;
    let menu = document.getElementsByClassName("menu")[0];
    menu.setAttribute("class","hidemenu");
    gameDiv.setAttribute("class","");
    game();
};
