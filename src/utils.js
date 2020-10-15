import { WIDTH, HEIGHT } from './settings';

export const areArraysSame = (array1, array2) => {
    if(!array1 || !array2) return false;
    return (array1.length === array2.length) && array1.every((element, index) => element === array2[index]);
};

export const areCoordsInBounds = (coords) => {
    const x = coords[0];
    const y = coords[1];
    if(x < 0 || y < 0 || x > WIDTH - 1 || y > HEIGHT - 1) return false;
    else return true;
};

export const generateEmptyBoard = (width, height) => {
    const board = [];
    const row = [];

    for (let i = 1; i <= width; i += 1) {
        row.push(0);
    }

    for (let y = 1; y <= height; y += 1) {
        board.push([...row]);
    }

    return board;
};

export const areCoordsInArray = (coords, arrayOfCoords) => {
    for(let i = 0; i <= arrayOfCoords.length; i++) {
        if(areArraysSame(arrayOfCoords[i], coords)) {
            return true;
        }
    }

    return false;
};

export const generateAvailableCoords = (unavailableCoords) => {
    const randomX = Math.floor((Math.random() * WIDTH - 1) + 1);
    const randomY = Math.floor((Math.random() * HEIGHT - 1) + 1);

    if (areCoordsInArray([randomX, randomY], unavailableCoords)) return generateAvailableCoords(unavailableCoords);

    return [randomX, randomY];
};

export const detectCollision = (coords, { foodCoords, snakeCoords }) => {
    // if the snake ate food
    if (areArraysSame(coords, foodCoords)) return 'food';

    // if snake hits itself
    if (areCoordsInArray(coords, snakeCoords)) return 'snake';
    
    // if the snake went out of bounds
    if (
        coords[0] === -1
        || coords[1] === -1
        || coords[0] === WIDTH
        || coords[1] === HEIGHT
    ) return 'bounds';

    return false;
};