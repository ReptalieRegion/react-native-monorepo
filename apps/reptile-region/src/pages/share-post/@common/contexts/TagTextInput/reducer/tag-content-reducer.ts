import type { TagContentsActions, TagContentsState } from '../types';

const tagContentReducer = (state: TagContentsState, actions: TagContentsActions): TagContentsState => {
    switch (actions.type) {
        case 'REGISTER_TEXT':
            const contentsLength = actions.contents.length;
            return { ...state, contents: actions.contents, selection: { start: contentsLength, end: contentsLength } };
        case 'CHANGE_TEXT':
            return { ...state, contents: actions.contents };
        case 'CHANGE_SELECTION':
            return { ...state, selection: actions.selection };
        case 'UPDATE_CONTENT_SELECT_TAG':
            const contents = state.contents;
            const selectionStart = state.selection.start;
            const prefix = contents.slice(0, selectionStart);
            const suffix = contents.slice(selectionStart + actions.tag.length, contents.length);
            const newNickname = suffix.startsWith(' ') ? actions.tag : actions.tag + ' ';
            const newContents = prefix + newNickname + suffix;

            return { ...state, contents: newContents };
        default:
            return state;
    }
};

export default tagContentReducer;
