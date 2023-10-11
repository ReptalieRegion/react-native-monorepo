import { TextInput } from 'react-native';

export type SelectionType = {
    start: number;
    end: number;
};

export type TagContentsState = {
    contents: string;
    selection: SelectionType;
};

interface ChangeContentsContents {
    type: 'CHANGE_TEXT';
    contents: string;
}

interface ChangeContentsSelection {
    type: 'CHANGE_SELECTION';
    selection: SelectionType;
}

interface UpdateContentSelectTag {
    type: 'UPDATE_CONTENT_SELECT_TAG';
    tag: string;
}

export type TagContentsActions = ChangeContentsContents | ChangeContentsSelection | UpdateContentSelectTag;

/** 현재 커서 위치에 있는 태그 정보 */
export type TagSearchState = {
    keyword: string;
    selection: SelectionType | undefined;
    enabled: boolean;
};

interface UpdateSearch {
    type: 'UPDATE_SEARCH';
    contentInfo: TagContentsState;
}

interface ResetSearch {
    type: 'RESET_SEARCH';
}

export type TagSearchActions = UpdateSearch | ResetSearch;

/** TextInput Ref 및 focus */
export type TagTextInputState = {
    textInputRef: React.RefObject<TextInput>;
};

export interface TagTextInputActions {
    focus(): void;
}
