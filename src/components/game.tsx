import React, { useContext, useRef, useEffect } from 'react';
import Board from './board';
import Context from '../context';
import { SPEED } from '../settings';
import '../style.css';

type Direction = 'left' | 'right' | 'up' | 'down';

function Game() {
    const [state, dispatch] = useContext(Context);
    const gameElementRef = useRef<HTMLDivElement>(null);
    const gameIntervalRef = useRef<number>();

    const moveSnake = () => { 
        dispatch({
            type: 'MOVE_SNAKE',
            ai: false,
        });
    };

    const moveSnakeAI = () => {
        dispatch({
            type: 'MOVE_SNAKE',
            ai: true,
        });
    };

    const generateFood = () => {
        dispatch({
            type: 'GENERATE_FOOD',
        });
    };

    const changeDirection = (direction: Direction) => {
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
                gameIntervalRef.current = window.setInterval(moveSnake, SPEED);
            } else {
                dispatch({
                    type: 'PAUSE',
                });
                clearInterval(gameIntervalRef.current);
            }
        }
    };

    const handleKey = (event: React.KeyboardEvent<HTMLElement>) => {
        switch (event.key.toLowerCase()) {
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
        gameElementRef.current && gameElementRef.current.focus();
        generateFood();
    }, []);

    return (
        <div
            id="game"
            onKeyDown={handleKey}
            tabIndex={0}
            ref={gameElementRef}
            className={state.gameOver ? 'game-over' : ''}
        >
            <h1>SneoWk</h1>
            <Board />
            <div>
                Score: { state.score }<br />
                Highscore: { state.highscore }
            </div>
        </div>
    );
}

export default Game;