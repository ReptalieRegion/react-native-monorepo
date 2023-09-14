import { useContext } from 'react';

import { BottomSheetAnimationActionContext } from '../contexts/BottomSheetAnimationContext';

const useBottomSheetAnimatedAction = () => {
    const dispatch = useContext(BottomSheetAnimationActionContext);

    if (dispatch === null) {
        throw new Error('BottomSheetProvider가 감싸져 있지 않습니다.');
    }

    return dispatch;
};

export default useBottomSheetAnimatedAction;
