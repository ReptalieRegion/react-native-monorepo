import { DEFAULT_SEARCH } from '../constants/tag-search';
import type { TagContentsState, TagSearchActions, TagSearchState } from '../type';

const extractTagFromIndex = (contentInfo: TagContentsState): TagSearchState => {
    const { selection, contents } = contentInfo;
    const isNotOneSelect = selection.start !== selection.end;
    const defaultState: TagSearchState = { ...DEFAULT_SEARCH };
    if (isNotOneSelect) {
        return defaultState;
    }

    let newContents = '';
    let tagStartIndex = selection.start - 1;
    let tagEndIndex = selection.start;

    while (tagStartIndex >= 0 && contents[tagStartIndex] !== ' ' && contents[tagStartIndex] !== '\n') {
        tagStartIndex--;
    }

    if ((tagStartIndex === 0 && contents[0] === '@') || contents[tagStartIndex + 1] === '@') {
        while (tagEndIndex < contents.length && contents[tagEndIndex] !== ' ' && contents[tagEndIndex] !== '\n') {
            tagEndIndex++;
        }
        newContents = contents.substring(tagStartIndex + 1, tagEndIndex);
        defaultState.keyword = newContents;
        defaultState.enabled = !!newContents;
        defaultState.selection = {
            start: tagStartIndex + 1,
            end: tagEndIndex,
        };

        return defaultState;
    }

    return defaultState;
};

const tagSearchReducer = (state: TagSearchState, action: TagSearchActions) => {
    switch (action.type) {
        case 'UPDATE_SEARCH':
            return extractTagFromIndex(action.contentInfo);
        case 'RESET_SEARCH':
            return { ...DEFAULT_SEARCH };
        default:
            return state;
    }
};

export default tagSearchReducer;
