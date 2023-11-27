import type { ReactNode } from 'react';
import React, { useReducer } from 'react';

import AlertContainer from '../components/AlertContainer';
import { DEFAULT_ALERT_STATE } from '../constants/alert';
import { AlertActionsContext, AlertStateContext } from '../contexts/AlertContext';
import alertReducer from '../reducer/alert-reducer';

type AlertProps = {
    children: ReactNode;
};

export default function Alert({ children }: AlertProps) {
    const [state, dispatch] = useReducer(alertReducer, DEFAULT_ALERT_STATE);

    return (
        <AlertActionsContext.Provider value={dispatch}>
            <AlertStateContext.Provider value={state}>
                {children}
                <AlertContainer />
            </AlertStateContext.Provider>
        </AlertActionsContext.Provider>
    );
}
