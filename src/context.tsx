import React, { createContext, useReducer } from 'react';
import reducer from './reducer';
import { State } from './types';
import { initialState } from './settings';

type Props = {
    children: React.ReactNode,
};

export const Context = createContext<{
    state: State,
    dispatch: React.Dispatch<any>
}>({
    state: initialState,
    dispatch: () => null,
});

export function Provider({ children }: Props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{state, dispatch}}>
            { children }
        </Context.Provider>
    );
}