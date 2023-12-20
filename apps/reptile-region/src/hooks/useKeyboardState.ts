import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export enum UseKeyboardState {
    UNKNOWN = 0,
    OPEN = 1,
    OPENING = 2,
    CLOSE = 3,
    CLOSING = 4,
}

export default function useKeyboardState() {
    const [keyboardState, setKeyboardState] = useState<UseKeyboardState>(UseKeyboardState.UNKNOWN);

    useEffect(() => {
        const keyboardOpen = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardState(UseKeyboardState.OPEN);
        });

        const keyboardOpening = Keyboard.addListener('keyboardWillShow', () => {
            setKeyboardState(UseKeyboardState.OPENING);
        });

        const keyboardClose = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardState(UseKeyboardState.CLOSE);
        });

        const keyboardClosing = Keyboard.addListener('keyboardWillHide', () => {
            setKeyboardState(UseKeyboardState.CLOSING);
        });

        return () => {
            keyboardOpen.remove();
            keyboardOpening.remove();
            keyboardClose.remove();
            keyboardClosing.remove();
        };
    }, []);

    return keyboardState;
}
