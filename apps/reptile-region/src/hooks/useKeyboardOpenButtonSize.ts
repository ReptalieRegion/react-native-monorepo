import useKeyboardState, { UseKeyboardState } from './useKeyboardState';

export default function useKeyboardOpenButtonSize() {
    const keyboardState = useKeyboardState();
    const size = keyboardState === UseKeyboardState.OPEN || keyboardState === UseKeyboardState.OPENING ? 'full' : 'medium';

    return size;
}
