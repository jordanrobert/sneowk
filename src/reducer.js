import { generateAvailableCoords, detectCollision } from './utils';
import { initialState } from './app';

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
            
        case 'SET_HIGHSCORE':
            return {
                ...state,
                highscore: action.highscore,
            }

        case 'MOVE_SNAKE': {
            let { snakeCoords, direction, score, gameOver, foodCoords, highscore } = state;
            snakeCoords = [...snakeCoords];
            const headCoords = snakeCoords[snakeCoords.length - 1];
            const headCoordsX = headCoords[0];
            const headCoordsY = headCoords[1];
            let nextSnakeCoords = [];
            
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

            switch(detectCollision(nextSnakeCoords, { foodCoords, snakeCoords })) {
                case 'food':
                    foodCoords = generateAvailableCoords([...state.snakeCoords, state.foodCoords]);
                    snakeCoords.push(nextSnakeCoords);
                    score += 1;
                    break;

                case 'snake':
                case 'bounds':
                    gameOver = true;
                    break;

                default:
                    snakeCoords.shift();
                    snakeCoords.push(nextSnakeCoords);
            }

            highscore = score > highscore ? score : highscore;
    
            return {
                ...state,
                snakeCoords,
                foodCoords,
                gameOver,
                score,
                highscore,
            }
        }

        case 'RESET_GAME':
            const foodCoords = generateAvailableCoords([...initialState.snakeCoords, initialState.foodCoords]);
            const { highscore } = state;

            return {
                ...initialState,
                highscore,
                foodCoords,
            };

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