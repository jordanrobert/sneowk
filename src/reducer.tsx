import { generateAvailableCoords, detectCollision } from './utils';
import { initialState } from './settings';
import { State, Direction } from './types';

type Action = 
    | { type: 'PAUSE' }
    | { type: 'UNPAUSE' }
    | { type: 'MOVE_SNAKE', ai: boolean }
    | { type: 'RESET_GAME' }
    | { type: 'GENERATE_FOOD' }
    | { type: 'SET_DIRECTION', direction: Direction }


export default function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'PAUSE': {
            return {
                ...state,
                paused: true,
            }
        }
            
        case 'UNPAUSE': {
            return {
                ...state,
                paused: false,
            }
        }

        case 'MOVE_SNAKE': {
            let { snakeCoords, foodCoords, direction, gameOver, score, highscore } = state;
            snakeCoords = [...snakeCoords];
            const headCoords: number[] = snakeCoords[snakeCoords.length - 1];
            const cachedHeadCoords = headCoords.slice();
            let nextSnakeCoords: number[] = [];

            const generateHeadCoords = (headCoords: number[], failCount = 0) => {
                const headCoordsX: number = headCoords[0];
                const headCoordsY: number = headCoords[1];

                if(action.ai) {
                    switch(failCount) {
                        case 0:
                            if(foodCoords[0] > headCoordsX) {
                                direction = 'right';
                            } else if(foodCoords[0] < headCoordsX) {
                                direction = 'left';
                            } else if(foodCoords[1] > headCoordsY) {
                                direction = 'down';
                            } else if(foodCoords[1] < headCoordsY) {
                                direction = 'up';
                            }
                            break;

                        case 1:
                            direction = 'left';
                            break;

                        case 2:
                            direction = 'right';
                            break;

                        case 3:
                            direction = 'up';
                            break;

                        case 4:
                            direction = 'down';
                            break;

                        default:
                            gameOver = true;
                            return;
                    }
                }
                
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
                        if(action.ai) {
                            generateHeadCoords(cachedHeadCoords, failCount + 1);
                        } else {
                            gameOver = true;
                        }
                        break;
    
                    default:
                        snakeCoords.shift();
                        snakeCoords.push(nextSnakeCoords);
                }
            };

            generateHeadCoords(headCoords, 0);

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

        case 'RESET_GAME': {
            const { highscore } = state;
            const foodCoords = generateAvailableCoords([...initialState.snakeCoords, initialState.foodCoords]);

            return {
                ...initialState,
                highscore,
                foodCoords,
            };
        }

        case 'GENERATE_FOOD': {
            const newFoodCoords = generateAvailableCoords([...state.snakeCoords, state.foodCoords]);
        
            return {
                ...state,
                foodCoords: newFoodCoords,
            }
        }

        case 'SET_DIRECTION': {
            const { direction } = action;

            return {
                ...state,
                direction,
            }
        }

        default: {
            return state;
        }
    }
}