import React, { useReducer } from 'react';
import Context from './context';
import Game from './components/game';
import reducer from './reducer';

const initialState = {
    snakeCoords: [
        [1, 1], // tail
        [2, 1],
        [3, 1], // head
    ],
    foodCoords: [1, 1],
    paused: true,
    gameOver: false,
    direction: 'right',
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={[state, dispatch]}>
            <Game></Game>
        </Context.Provider>
    )
}

export default App;