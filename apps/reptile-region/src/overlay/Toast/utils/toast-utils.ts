import { ICON_MAP, TOAST_STYLES } from '../tokens/color';
import type { ToastSeverity } from '../types';

export const createToastStyles = (severity: ToastSeverity | null) => {
    if (severity === null) {
        return TOAST_STYLES.error;
    }

    return TOAST_STYLES[severity];
};

export const createIcon = (severity: ToastSeverity | null) => {
    if (severity === null) {
        return ICON_MAP.error;
    }

    return ICON_MAP[severity];
};
