export type State = {
    snakeCoords: number[][],
    foodCoords:  number[],
    paused: boolean,
    gameOver: boolean,
    direction: string,
    score: number,
    highscore: number,
};

export type Coords = number[];

// convert to enum
export type Direction = 'left' | 'right' | 'up' | 'down';