import { useContext } from 'react';

import { BottomSheetAnimationStateContext } from '../contexts/BottomSheetAnimationContext';

export default function useBottomSheetAnimatedState() {
    const state = useContext(BottomSheetAnimationStateContext);

    if (state === null) {
        throw new Error('BottomSheetProvider가 감싸져 있지 않습니다.');
    }

    return state;
}
