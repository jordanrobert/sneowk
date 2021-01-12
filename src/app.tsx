import React from 'react';
import { Provider } from './context';
import Game from './components/game';
import './style.css';

export default function App() {
    return (
        <Provider>
            <Game></Game>
        </Provider>
    );
}