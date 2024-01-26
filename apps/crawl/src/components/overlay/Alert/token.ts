import type { AlertStyle } from './types';

export const ALERT_STYLES: AlertStyle = {
    cancel: {
        color: 'default',
        variant: 'body2',
    },
    default: {
        color: 'primary',
        variant: 'title4',
    },
    danger: {
        color: 'error',
        variant: 'title4',
    },
} as const;
