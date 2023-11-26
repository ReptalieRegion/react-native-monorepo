type ButtonInfo = {
    type?: 'cancel' | 'ok';
    text: string;
    onPress?(): void;
};

export type AlertState = {
    show: boolean;
    title: string | null;
    contents?: string;
    buttons: ButtonInfo[];
};

export interface OpenAlert {
    type: 'OPEN_ALERT';
    title: string;
    contents?: string;
    buttons: ButtonInfo[];
}

interface CloseAlert {
    type: 'CLOSE_ALERT';
}

export type AlertActions = OpenAlert | CloseAlert;
