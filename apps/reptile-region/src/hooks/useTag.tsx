import { useContext } from 'react';

import { TagTextInputActionContext, TagTextInputStateContext } from '@/contexts/TagTextInputContext';

const useTag = () => {
    const state = useContext(TagTextInputStateContext);
    const dispatch = useContext(TagTextInputActionContext);

    if (dispatch === null || state === null) {
        throw new Error('TagTextInputProvider가 필요합니다.');
    }

    return {
        contents: state.contentsInfo.contents,
        keyword: state.searchInfo.keyword,
        handleChangeSelection: dispatch.handleChangeSelection,
        handleChangeText: dispatch.handleChangeText,
        handleSelectTag: dispatch.handleSelectTag,
    };
};

export default useTag;
