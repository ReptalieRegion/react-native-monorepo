import type { TagContentsActions, TagContentsState } from '../type';

const tagContentReducer = (state: TagContentsState, action: TagContentsActions): TagContentsState => {
    switch (action.type) {
        case 'CHANGE_TEXT':
            return { ...state, contents: action.contents };
        case 'CHANGE_SELECTION':
            return { ...state, selection: action.selection };
        case 'UPDATE_CONTENT_SELECT_TAG':
            const contents = state.contents;
            const selectionStart = state.selection.start;
            const prefix = contents.slice(0, selectionStart);
            const suffix = contents.slice(selectionStart + action.tag.length, contents.length);
            const newNickname = suffix.startsWith(' ') ? action.tag : action.tag + ' ';
            const newContents = prefix + newNickname + suffix;

            return { ...state, contents: newContents };
        default:
            return state;
    }
};

export default tagContentReducer;
