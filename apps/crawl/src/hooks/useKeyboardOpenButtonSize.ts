import { useEffect, useRef, useState } from 'react';

import useKeyboardState, { UseKeyboardState } from './useKeyboardState';
import useSwipePage from './useSwipePage';

import type { ConfirmButtonSize } from '@/components/@common/atoms/Button/ConfirmButton';

export default function useKeyboardOpenButtonSize() {
    const keyboardState = useKeyboardState();
    const { isSwipeStart } = useSwipePage();

    const [buttonSize, setButtonSize] = useState<ConfirmButtonSize>(
        keyboardState === UseKeyboardState.OPEN || keyboardState === UseKeyboardState.OPENING ? 'full' : 'medium',
    );

    const lastButtonSize = useRef(buttonSize);

    useEffect(() => {
        const newButtonSize = isSwipeStart
            ? lastButtonSize.current
            : keyboardState === UseKeyboardState.OPEN || keyboardState === UseKeyboardState.OPENING
              ? 'full'
              : 'medium';
        setButtonSize(newButtonSize);
        lastButtonSize.current = newButtonSize;
    }, [isSwipeStart, keyboardState]);

    return buttonSize;
}
