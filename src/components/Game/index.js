import React, {useState} from "react";
import Board from "../Board";


function calculateWinner(squares) {
    // Check row
    const game_size = Math.sqrt(squares.length);
    for (let i = 0; i < game_size; i++){
        for (let j = 0; j < game_size - 4; j++){
            // the last 4 slot of a row cant make a 5-win streak
            // so we only need to consider from pos 0 to game_size - 4 to reduce calculation
            const pos = i * game_size + j;
            if(squares[pos]){
                let win_array = [pos];
                for (let win_streak = 1; win_streak < 5; win_streak++) {
                    if (squares[pos] === squares[pos + win_streak])
                        win_array.push(pos + win_streak); // append next streak location
                    else break;
                }
                if(win_array.length === 5){
                    return {
                        winner: squares[pos],
                        drawResult: false,
                        winSquares: win_array
                    };
                }
            }
        }
    }
    // Check columns
    for (let j = 0; j < game_size - 4; j++){
        // the last 4 slot of a column cant make a 5-win streak
        // so we only need to consider from pos 0 to game_size - 4 to reduce calculation
        for (let i = 0; i < game_size; i++){
            const pos = j * game_size + i;
            if(squares[pos]){
                let win_array = [pos];
                for (let win_streak = 1; win_streak < 5; win_streak++) {
                    if (squares[pos] === squares[pos + win_streak * game_size])
                        win_array.push(pos + win_streak * game_size); // append next streak location
                    else break;
                }
                if(win_array.length === 5){
                    return {
                        winner: squares[pos],
                        drawResult: false,
                        winSquares: win_array
                    };
                }
            }
        }
    }
    // Check primary diagonal lines
    for (let pos = 0; pos < squares.length; pos++){
        if(squares[pos]){
            let win_array = [pos];
            for (let win_streak = 1; win_streak < 5; win_streak++) {
                const next_streak = pos + win_streak * (game_size + 1);
                if (next_streak < squares.length
                    && squares[pos] === squares[next_streak])
                    win_array.push(next_streak); // append next streak location
                else break;
            }
            if(win_array.length === 5){
                return {
                    winner: squares[pos],
                    drawResult: false,
                    winSquares: win_array
                };
            }
        }
    }
    // Check secodary diagonal lines
    let available_move = false;
    for (let pos = 0; pos < squares.length; pos++){
        if(squares[pos]){
            let win_array = [pos];
            for (let win_streak = 1; win_streak < 5; win_streak++) {
                const next_streak = pos + win_streak * (game_size - 1);
                if (next_streak < squares.length
                    && squares[pos] === squares[next_streak])
                    win_array.push(next_streak); // append next streak location
                else break;
            }
            if(win_array.length === 5){
                return {
                    winner: squares[pos],
                    drawResult: false,
                    winSquares: win_array
                };
            }
        }
        else{
            available_move = true;
        }
    }

    return {
        winner: null,
        drawResult: !available_move,
        winSquares: null
    };
}

const Game = ({gameboard_size}) => {
    const [history, setHistory] = useState([
        {
            squares: Array(gameboard_size**2).fill(null)
        }
    ]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [AscMovelist, setAscMovelist] = useState(true);

    const handleClick = (i) => {
        const new_history = history.slice(0, stepNumber + 1);
        const current = new_history[new_history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares).winner || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? "X" : "O";

        setHistory(new_history.concat([
            {
                squares: squares,
                currentMove: i
            }
        ]));
        setStepNumber(new_history.length);
        setXIsNext(!xIsNext);
    };
    const jumpTo = (step) => {
        setXIsNext((step % 2) === 0);
        setStepNumber(step);
    };
    const changSortOrder = () => {
        setAscMovelist(!AscMovelist);
    };

    const current = history[stepNumber];
    const gameStatus = calculateWinner(current.squares);
    const winner = gameStatus.winner;

    let moves = history.map((step, move) => {
        const col = step.currentMove % gameboard_size,
            row = ~~(step.currentMove / gameboard_size),
            desc = move ?
                'Go to move #' + move +' [col: ' + col + ' - row: ' + row + ']' :
                'Go to game start';
        return (
            <li key={move}>
                <button
                    className={move === stepNumber ? 'currently-selected-move-list' : ''}
                    onClick={() => jumpTo(move)}>{desc}
                </button>
            </li>
        );
    });

    let status = winner ?
        "Winner: " + winner:
        gameStatus.drawResult ?
            "Draw!!":
            "Next player: " + (xIsNext ? "X" : "O");


    // reverse movelist due to state setting
    if(!AscMovelist)
        moves.reverse();
    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={i => handleClick(i)}
                    winSquares={(gameStatus.winSquares)}
                    board_size={gameboard_size}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <button
                    onClick={() => changSortOrder()}>
                    {AscMovelist ? 'Descending' : 'Ascending'}
                </button>
                <ol>{moves}</ol>
            </div>
        </div>
    );
};

export default Game;