export type ToastSeverity = 'error' | 'warning' | 'info' | 'success';

export type ToastState = {
    show: boolean;
    title?: string | null;
    contents: string | null;
    severity: ToastSeverity | null;
};

export interface OpenToast {
    type: 'OPEN_TOAST';
    title?: string;
    contents: string;
    severity: ToastSeverity;
}

interface CloseToast {
    type: 'CLOSE_TOAST';
}

export type ToastActions = OpenToast | CloseToast;
