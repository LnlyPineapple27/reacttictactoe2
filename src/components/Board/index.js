import React from "react";
import Square from "../Square";

/**
 *
 * @param {array} squares on Board
 * @param {callback} onClick
 * @param {array} winSquares are Squares to be highlighted
 * @param {number} board_size
 * @returns {JSX.Element}
 * @constructor
 */
const Board = ({squares, onClick, winSquares, board_size}) => {
    const renderSquare = (i) => {
        return (
            <Square
                value={squares[i]}
                onClick={() => onClick(i)}
                // Highlight if the square's current pos "i" is in the winSquares returned from Games
                highlight={winSquares && winSquares.includes(i)}
            />
        );
    }
    const renderRow = (startingSlot) => {
        let rowButtons = [];
        for(let i = 0; i < board_size; ++i){
            rowButtons.push(renderSquare(startingSlot + i));
        }
        return (
            <div className="board-row">
                {rowButtons}
            </div>
        );
    }

    // ========================================
    let arrButtons = [];
    for(let i = 0; i < board_size**2; i += board_size){
        arrButtons.push(renderRow(i));
    }
    return (
        <div>
            {arrButtons}
        </div>
    );
};
export default Board;