import React, { ReactNode, useReducer } from 'react';

import ToastContainer from '../components/ToastContainer';
import { DEFAULT_TOAST_STATE } from '../constants/tost';
import { ToastActionsContext, ToastStateContext } from '../contexts/ToastContext';
import toastReducer from '../reducer/tost-reducer';

type ToastProps = {
    children: ReactNode;
};

export default function Toast({ children }: ToastProps) {
    const [state, dispatch] = useReducer(toastReducer, DEFAULT_TOAST_STATE);

    return (
        <ToastActionsContext.Provider value={dispatch}>
            <ToastStateContext.Provider value={state}>
                {children}
                <ToastContainer />
            </ToastStateContext.Provider>
        </ToastActionsContext.Provider>
    );
}
