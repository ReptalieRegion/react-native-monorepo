import type { SelectionType, TagContentsActions, TagContentsState, UpdateContentSelectTag } from '../types';

export default function tagContentReducer(state: TagContentsState, actions: TagContentsActions): TagContentsState {
    switch (actions.type) {
        case 'CHANGE_TEXT':
            return changeText(state, actions.contents);
        case 'CHANGE_SELECTION':
            return changeSelection(state, actions.selection);
        case 'UPDATE_CONTENT_SELECT_TAG':
            return updateContentSelectTag(state, actions);
        case 'REGISTER_TEXT':
            return registerText(state, actions.contents);
        default:
            throw new Error('Tag Reducer에서 사용하지 않는 type이 들어왔습니다.');
    }
}

function registerText(state: TagContentsState, contents: string): TagContentsState {
    const contentsLength = contents.length;
    return {
        ...state,
        contents: contents,
        selection: {
            start: contentsLength,
            end: contentsLength,
        },
    };
}

function changeText(state: TagContentsState, contents: string): TagContentsState {
    return { ...state, contents };
}

function changeSelection(state: TagContentsState, selection: SelectionType): TagContentsState {
    return { ...state, selection };
}

function updateContentSelectTag(state: TagContentsState, { tag }: Omit<UpdateContentSelectTag, 'type'>) {
    const contents = state.contents;
    const selectionStart = state.selection.start;
    const selectionEnd = state.selection.end;

    if (selectionStart === selectionEnd) {
        const tagStartIndex = contents.lastIndexOf('@', selectionStart);
        const tagEndIndex = contents.indexOf(' ', tagStartIndex);
        if (tagStartIndex === -1) {
            return state;
        }

        const prefix = contents.slice(0, tagStartIndex + 1);
        const suffix = contents.slice(tagEndIndex === -1 ? contents.length : tagEndIndex);
        const newNickname = suffix.startsWith(' ') ? tag : tag + ' ';
        const newContents = prefix + newNickname + suffix;

        return { ...state, contents: newContents };
    }

    return state;
}
