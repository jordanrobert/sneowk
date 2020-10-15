import React, { useContext, useRef, useEffect } from 'react';
import Board from './board';
import Context from '../context';
import { SPEED } from '../settings';
import '../style.css';

function Game() {
    const [state, dispatch] = useContext(Context);
    const gameElementRef = useRef();
    const gameIntervalRef = useRef();

    const moveSnake = () => {
        dispatch({
            type: 'MOVE_SNAKE',
        });
    };

    const generateFood = () => {
        dispatch({
            type: 'GENERATE_FOOD',
        });
    };

    const handleKey = (e) => {
        let newDirection;
        switch (e.key.toLowerCase()) {
            case 'w':
                if (state.direction !== 'down') newDirection = 'up';
                break;

            case 'a':
                if (state.direction !== 'right') newDirection = 'left';
                break;

            case 's':
                if (state.direction !== 'up') newDirection = 'down';
                break;

            case 'd':
                if (state.direction !== 'left') newDirection = 'right';
                break;

            case ' ':
                if (state.gameOver) break;

                if (state.paused) {
                    dispatch({
                        type: 'UNPAUSE',
                    });
                    gameIntervalRef.current = setInterval(moveSnake, SPEED);
                } else {
                    dispatch({
                        type: 'PAUSE',
                    });
                    clearInterval(gameIntervalRef.current);
                }
                break;

            default:
        }

        if(newDirection) {
            dispatch({
                type: 'SET_DIRECTION',
                direction: newDirection,
            });
        }
    };

    useEffect(() => {
        if(state.gameOver) {
            clearInterval(gameIntervalRef.current);
        }
    }, [state.gameOver]);

    useEffect(() => {
        gameElementRef.current.focus();
        generateFood();
    }, []);

    return (
        <div
            id="game"
            onKeyDown={handleKey}
            tabIndex="0"
            ref={gameElementRef}
            className={state.gameOver ? 'game-over' : ''}
        >
            <h1>SneoWk</h1>
            <Board />
            <div>
                Score: { state.score }
            </div>
        </div>
    );
}

export default Game;