// Represents the state of the game
// It first creates a 3x3 2d array and fills each with a cell.
function Gameboard () {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    // The checkCell variable is to make sure that the move is valid before doing anything.
    // Returns false if the move was invalid and true if it was.
    // Each time a valid move is made it checks if that was a winning move.
    const makeMark = (row, column, playerMark) => {
        const checkCell = board[row][column].getValue() === 0 ? true : false;

        if (!checkCell) {
            console.log("space not available");
            return false;
        }

        board[row][column].addMark(playerMark);
        return true;
    };

    const printBoard = () => {
        const fullBoard = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(fullBoard);
    };

    // Goes through each row and then for each value in the row sets the value to the default value.
    const resetBoard = () => {
        board.forEach(row => row.forEach(cell => cell.addMark(0)));
    };

    return {
        makeMark,
        printBoard,
        getBoard,
        resetBoard,
    }
}

// Each cell represents one square on the board
// A cell can have either 0, meaning unfilled, or X / O, meaning marked by either player.
function Cell () {
    let value = 0;

    // Marks the cell with the mark of the player whose turn it is.
    const addMark = (playerMark) => {
        value = playerMark;
    };

    // Returns the value of the cell.
    const getValue = () => value;

    return {
        addMark,
        getValue,
    };
}

// Controls the data for each player and whose turn it is.
// Also checks if someone makes a winning move.
function GameController (playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard();
    let turns = 0;

    const players = [
        {
            name: playerOneName,
            mark: "X",
            points: 0,
        },
        {
            name: playerTwoName,
            mark: "O",
            points: 0,
        }
    ];

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    // It first runs the makeMark function which returns false if it can't make a mark
    // If the move was false (invalid), it prints the round again and doesn't switch turns.
    const playRound = (row, column) => {
        console.log(`Placing ${getActivePlayer().name}'s mark into row ${row}, column ${column}...`);
        const validMove = board.makeMark(row, column, getActivePlayer().mark);

        if (!validMove) {
            printNewRound();
            return;
        }

        turns++;
        checkForWinner(row, column);
        switchPlayerTurn();
        printNewRound();
    };

    // First it checks the row where the mark was placed, then it checks it's column, and then it checks both diagonals
    // currentRow is used to differentiate from the row parameter
    const checkForWinner = (row, column) => {
        // In each case it first prints out who won,
        // then it adds the point to the player that won and also prints out the winners score,
        // then it resets the turns,
        // and then it resets the board
        switch (true) {
            case (board.getBoard()[row].every((space) => space.getValue() === getActivePlayer().mark)):
                getActivePlayer() === players[0] ? console.log(`Player 1 wins`) : console.log(`Player 2 wins`);
                getActivePlayer().points++;
                console.log(`${getActivePlayer().name}: ${getActivePlayer().points++}`);
                console.log("case 1");
                turns = 0;
                board.printBoard();
                board.resetBoard();
                break;
            case (board.getBoard().map((currentRow) => currentRow[column]).every((space) => space.getValue() === getActivePlayer().mark)):
                getActivePlayer() === players[0] ? console.log(`Player 1 wins`) : console.log(`Player 2 wins`);
                getActivePlayer().points++;
                console.log(`${getActivePlayer().name}: ${getActivePlayer().points++}`);
                console.log("case 2");
                turns = 0;
                board.printBoard();
                board.resetBoard();
                break;
            case (board.getBoard()[0][0].getValue() === getActivePlayer().mark && board.getBoard()[1][1].getValue() === getActivePlayer().mark && board.getBoard()[2][2].getValue() === getActivePlayer().mark):
                getActivePlayer() === players[0] ? console.log(`Player 1 wins`) : console.log(`Player 2 wins`);
                getActivePlayer().points++;
                console.log(`${getActivePlayer().name}: ${getActivePlayer().points++}`);
                console.log("case 3");
                turns = 0;
                board.printBoard();
                board.resetBoard();
                break;
            case (board.getBoard()[2][0].getValue() === getActivePlayer().mark && board.getBoard()[1][1].getValue() === getActivePlayer().mark && board.getBoard()[0][2].getValue() === getActivePlayer().mark):
                getActivePlayer() === players[0] ? console.log(`Player 1 wins`) : console.log(`Player 2 wins`);
                getActivePlayer().points++;
                console.log(`${getActivePlayer().name}: ${getActivePlayer().points++}`);
                console.log("case 4");
                turns = 0;
                board.printBoard();
                board.resetBoard();
                break;
            default:
                console.log("no winner");
        }

        // If 9 turns pass that means the board is completely filled
        // So if there's no winner after nine turns it means a draw
        if (turns == 9) {
            console.log("draw");
            turns = 0;
            board.resetBoard();
        }
    };


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