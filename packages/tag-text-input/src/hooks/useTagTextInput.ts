import { useContext } from 'react';

import { TagTextInputActionsContext } from '../contexts/TagTextInputContext';

const useTagTextInput = () => {
    const dispatch = useContext(TagTextInputActionsContext);

    if (dispatch === null) {
        throw new Error('TagProvider를 감싸주세요');
    }

    return dispatch;
};

export default useTagTextInput;
