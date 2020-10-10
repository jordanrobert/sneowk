import { generateAvailableCoords, areArraysSame, areCoordsInArray } from './utils';
import { WIDTH, HEIGHT } from './settings';

export default function reducer(state, action) {
    switch (action.type) {
        case 'PAUSE':
            return {
                ...state,
                paused: true,
            }
            
        case 'UNPAUSE':
            return {
                ...state,
                paused: false,
            }

        case 'MOVE_SNAKE': {
            const { snakeCoords, direction } = state;
            const headCoords = snakeCoords[snakeCoords.length - 1];
            const headCoordsX = headCoords[0];
            const headCoordsY = headCoords[1];
            const newSnakeCoords = [...snakeCoords];
            let nextSnakeCoords = [];
            let newFoodCoords = state.foodCoords;
            let gameOver = false;
            
            switch (direction) {
                case 'up':
                    nextSnakeCoords = [headCoordsX, headCoordsY - 1];
                    break;
    
                case 'right':
                    nextSnakeCoords = [headCoordsX + 1, headCoordsY];
                    break;
    
                case 'down':
                    nextSnakeCoords = [headCoordsX, headCoordsY + 1];
                    break;
    
                case 'left':
                    nextSnakeCoords = [headCoordsX - 1, headCoordsY];
                    break;
    
                default:
            }

            // if the snake ate food
            if (areArraysSame(nextSnakeCoords, state.foodCoords)) {
                newFoodCoords = generateAvailableCoords([...state.snakeCoords, state.foodCoords]);
                newSnakeCoords.push(nextSnakeCoords);
            } else {
                // if the snake went out of bounds
                // or if snake hits itself
                if (
                    (nextSnakeCoords[0] === -1 || nextSnakeCoords[1] === -1 || nextSnakeCoords[0] === WIDTH || nextSnakeCoords[1] === HEIGHT) ||
                    areCoordsInArray(nextSnakeCoords, state.snakeCoords)
                 ) {
                    gameOver = true;
                } else {
                    newSnakeCoords.shift();
                    newSnakeCoords.push(nextSnakeCoords);
                }
            }
            
    
            return {
                ...state,
                snakeCoords: newSnakeCoords,
                foodCoords: newFoodCoords,
                gameOver,
            }
        }

        case 'GENERATE_FOOD':
            const newFoodCoords = generateAvailableCoords([...state.snakeCoords, state.foodCoords]);
        
            return {
                ...state,
                foodCoords: newFoodCoords,
            }

        case 'SET_DIRECTION':
            return {
                ...state,
                direction: action.direction,
            }

        default:
            return state;
    }
}