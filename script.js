function Gameboard () {
    const rows = 3;
    const columns = 3;
    const board = [];
    let turns = 0;

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const makeMark = (row, column, playerMark) => {
        const checkCell = board[row][column].getValue() === 0 ? true : false;

        if (!checkCell) {
            console.log("space not available");
            return false;
        }

        board[row][column].addMark(playerMark);
        turns++;
        checkForWinner(row, column, playerMark);
        return true;
    };

    const checkForWinner = (row, column, playerMark) => {
        if (turns == 9) {
            console.log("draw");
        }

        // First it checks the row where the mark was placed, then it checks it's column, and then it checks both diagonals. 
        // currentRow is used to differentiate from the row parameter.
        switch (true) {
            case (board[row].every((space) => space.getValue() === playerMark)):
                playerMark === "X" ? console.log(`Player 1 wins`) : console.log(`Player 2 wins`);
                console.log("case 1");
                break;
            case (board.map((currentRow) => currentRow[column]).every((space) => space.getValue() === playerMark)):
                playerMark === "X" ? console.log(`Player 1 wins`) : console.log(`Player 2 wins`);
                console.log("case 2");
                break;
            case (board[0][0].getValue() === playerMark && board[1][1].getValue() === playerMark && board[2][2].getValue() === playerMark):
                playerMark === "X" ? console.log(`Player 1 wins`) : console.log(`Player 2 wins`);
                console.log("case 3");
                break;
            case (board[2][0].getValue() === playerMark && board[1][1].getValue() === playerMark && board[0][2].getValue() === playerMark):
                playerMark === "X" ? console.log(`Player 1 wins`) : console.log(`Player 2 wins`);
                console.log("case 4");
                break;
            default:
                console.log("no winner");
        }
    };

    const printBoard = () => {
        const fullBoard = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(fullBoard);
    };

    return {
        makeMark,
        printBoard,
    }
}

function Cell () {
    let value = 0;

    const addMark = (playerMark) => {
        value = playerMark;
    };

    const getValue = () => value;

    return {
        addMark,
        getValue,
    };
}

function GameController (playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            mark: "X",
        },
        {
            name: playerTwoName,
            mark: "O",
        }
    ];

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const playRound = (row, column) => {
        console.log(`Placing ${getActivePlayer().name}'s mark into row ${row}, column ${column}...`);
        const validMove = board.makeMark(row, column, getActivePlayer().mark);

        if (!validMove) {
            printNewRound();
            return;
        }

        switchPlayerTurn();
        printNewRound();
    }

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    };

    // Start of game message
    printNewRound();

    return {
        playRound,
    }
}

const game = GameController();