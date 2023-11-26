import type { AlertState } from '../types';

export const DEFAULT_ALERT_STATE: AlertState = {
    show: false,
    title: null,
    contents: undefined,
    buttons: [
        {
            type: 'cancel',
            text: '취소',
        },
        {
            type: 'ok',
            text: '확인',
        },
    ],
};
