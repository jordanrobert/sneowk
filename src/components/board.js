import React, { useContext, useEffect, useState } from 'react';
import { generateEmptyBoard } from '../utils';
import { WIDTH, HEIGHT } from '../settings';
import Context from '../context';

function Board() {
    const [state, dispatch] = useContext(Context);
    const [board, setBoard] = useState(generateEmptyBoard(WIDTH, HEIGHT));

    useEffect(() => {
        const foodX = state.foodCoords[0];
        const foodY = state.foodCoords[1];
        const newBoard = generateEmptyBoard(WIDTH, HEIGHT);;

        state.snakeCoords.map((square) => newBoard[square[1]][square[0]] = 1);
        newBoard[foodY][foodX] = 2;

        setBoard(newBoard);
    }, [state.snakeCoords, state.foodCoords]);

    return (
        <div className={`board ${ state.paused ? 'board--paused' : '' }`}>
            {
                board.map((row, i) => (
                    <div className="row" key={i}>
                        {
                            row.map((square, i) => <div className={`square ${
                                square === 1 ? 'square--snake' : 
                                square === 2 ? 'square--food' :
                                ''
                            }`} key={i}></div>)
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default Board;
