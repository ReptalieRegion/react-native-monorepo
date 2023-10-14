import { color } from '@reptile-region/design-system';

import { Error, Info, Success, Warning } from '@/assets/icons';

const TEXT_COLOR = {
    error: 'error-toast',
    warning: 'warning-toast',
    info: 'info-toast',
    success: 'success-toast',
} as const;

const ICON_COLOR = {
    error: color.Red[700].toString(),
    warning: color.Orange[750].toString(),
    info: color.LightBlue[700].toString(),
    success: color.Green[800].toString(),
} as const;

const BACKGROUND_COLOR = {
    error: color.Red[75].toString(),
    warning: color.Orange[75].toString(),
    info: color.Blue[75].toString(),
    success: color.Green[75].toString(),
} as const;

export const TOAST_STYLES = {
    error: {
        text: TEXT_COLOR.error,
        icon: ICON_COLOR.error,
        background: BACKGROUND_COLOR.error,
    },
    warning: {
        text: TEXT_COLOR.warning,
        icon: ICON_COLOR.warning,
        background: BACKGROUND_COLOR.warning,
    },
    info: {
        text: TEXT_COLOR.info,
        icon: ICON_COLOR.info,
        background: BACKGROUND_COLOR.info,
    },
    success: {
        text: TEXT_COLOR.success,
        icon: ICON_COLOR.success,
        background: BACKGROUND_COLOR.success,
    },
} as const;

export const ICON_MAP = {
    error: Error,
    warning: Warning,
    info: Info,
    success: Success,
} as const;
