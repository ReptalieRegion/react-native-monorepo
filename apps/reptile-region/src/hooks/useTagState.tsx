import { useContext } from 'react';

import { TagTextInputStateContext } from '@/contexts/TagTextInputContext';

const useTagState = () => {
    const state = useContext(TagTextInputStateContext);

    if (state === null) {
        throw new Error('TagTextInputProvider가 필요합니다.');
    }

    return {
        currentSelection: state.contentsInfo.selection,
        contents: state.contentsInfo.contents,
        selection: state.contentsInfo.selection,
        keyword: state.searchInfo.keyword,
        moveSelection: state.moveSelection,
    };
};

export default useTagState;
