import { DEFAULT_ALERT_STATE } from '../constants/alert';
import type { AlertActions, AlertState, OpenAlert } from '../types';

const openAlert = (state: AlertState, { contents, title, buttons }: Omit<OpenAlert, 'type'>): AlertState => {
    return { ...state, show: true, contents, title, buttons };
};

const closeAlert = (): AlertState => {
    return { ...DEFAULT_ALERT_STATE };
};

const alertReducer = (state: AlertState, actions: AlertActions): AlertState => {
    switch (actions.type) {
        case 'OPEN_ALERT':
            return openAlert(state, { ...actions });
        case 'CLOSE_ALERT':
            return closeAlert();
        default:
            return state;
    }
};

export default alertReducer;
