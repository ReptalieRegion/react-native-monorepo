import { DEFAULT_TOAST_STATE } from '../constants/tost';
import type { OpenToast, ToastActions, ToastState } from '../types';

const openToast = (state: ToastState, { contents, severity, title }: Omit<OpenToast, 'type'>): ToastState => {
    return { ...state, show: true, contents, severity, title };
};

const closeToast = (): ToastState => {
    return { ...DEFAULT_TOAST_STATE };
};

const toastReducer = (state: ToastState, actions: ToastActions): ToastState => {
    switch (actions.type) {
        case 'OPEN_TOAST':
            return openToast(state, { ...actions });
        case 'CLOSE_TOAST':
            return closeToast();
        default:
            return state;
    }
};

export default toastReducer;
