import React, {useState} from "react";
import Game from '../Game';

const Setup = () => {
    const [gameSize, setGameSize] = useState(10);

    return (
        <div className="config">
            <div id="author">
                <h1>React tictactoe assignment 02</h1>
                <p>by Phan Tan Dat - 18127078</p>
            </div>

            <div id = "new_game">
                <Game gameboard_size={gameSize} />
            </div>

        </div>
    );

};

export default Setup;
