import { State } from './types';

export const WIDTH = 10;
export const HEIGHT = 10;
export const SPEED = 170;
export const initialState: State = {
    snakeCoords: [
        [1, 1], // tail
        [2, 1],
        [3, 1], // head
    ],
    foodCoords: [0, 0],
    paused: true,
    gameOver: false,
    direction: 'right',
    score: 0,
    highscore: 0,
};