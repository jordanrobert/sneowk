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

    const changeDirection = (direction) => {
        dispatch({
            type: 'SET_DIRECTION',
            direction,
        });
    };

    const togglePause = () => {
        if (state.gameOver) {
            dispatch({
                type: 'RESET_GAME',
            });
        } else {
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
        }
    };

    const handleKey = (e) => {
        switch (e.key.toLowerCase()) {
            case 'w':
                if (state.direction !== 'down') changeDirection('up');
                break;

            case 'a':
                if (state.direction !== 'right') changeDirection('left');
                break;

            case 's':
                if (state.direction !== 'up') changeDirection('down');
                break;

            case 'd':
                if (state.direction !== 'left') changeDirection('right');
                break;

            case ' ':
                togglePause();
                break;

            default:
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
        
        fetch('https://run.mocky.io/v3/50cb3d0e-a732-49f2-87b3-042fc65bbeb0')
            .then(res => res.json())
            .then(({ highscore }) => {
                dispatch({
                    type: 'SET_HIGHSCORE',
                    highscore,
                })
            });
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
                Score: { state.score }<br />
                HighScore: { state.highscore ? state.highscore : 'Loading' }
            </div>
            <div class="controls">
                <button onClick={() => changeDirection('up')} class="control control-up"></button>
                <button onClick={() => changeDirection('left')} class="control control-left"></button>
                <button onClick={() => changeDirection('right')} class="control control-right"></button>
                <button onClick={() => changeDirection('down')} class="control control-down"></button>
                <button onClick={() => togglePause()} class="control-pause"></button>
            </div>
        </div>
    );
}

export default Game;