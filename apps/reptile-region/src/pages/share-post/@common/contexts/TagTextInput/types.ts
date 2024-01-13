import { TextInput } from 'react-native';

/** 공통 타입 */
type SelectionType = {
    start: number;
    end: number;
};

/** 상태 */
type TagContentsState = {
    contents: string;
    selection: SelectionType;
};

interface RegisterContents {
    type: 'REGISTER_TEXT';
    contents: string;
}

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

type TagContentsActions = ChangeContentsContents | ChangeContentsSelection | UpdateContentSelectTag | RegisterContents;

/** 현재 커서 위치에 있는 태그 정보 */
type TagSearchState = {
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

type TagSearchActions = UpdateSearch | ResetSearch;

/** TextInput Ref 및 focus */
type TagTextInputState = {
    textInputRef: React.RefObject<TextInput>;
};

interface TagTextInputActions {
    focus(): void;
}

export type {
    ChangeContentsContents,
    ChangeContentsSelection,
    RegisterContents,
    ResetSearch,
    SelectionType,
    TagContentsActions,
    TagContentsState,
    TagSearchActions,
    TagSearchState,
    TagTextInputActions,
    TagTextInputState,
    UpdateContentSelectTag,
    UpdateSearch,
};
