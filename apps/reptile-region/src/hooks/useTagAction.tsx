import { useContext } from 'react';

import { TagTextInputActionContext } from '@/contexts/TagTextInputContext';

const useTagAction = () => {
    const dispatch = useContext(TagTextInputActionContext);

    if (dispatch === null) {
        throw new Error('TagTextInputProvider가 필요합니다.');
    }

    return dispatch;
};

export default useTagAction;
