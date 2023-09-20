import { SelectionType } from './tag';

/** TextInput의 정보 */
export type TagContentsState = {
    contents: string;
    selection: SelectionType;
};

interface ChangeContentsContents {
    type: 'CHANGE_TEXT';
    contents: string;
    callback: (contentInfo: TagContentsState) => void;
}

interface ChangeContentsSelection {
    type: 'CHANGE_SELECTION';
    selection: SelectionType;
    callback: (contentInfo: TagContentsState) => void;
}

interface UpdateContentSelectTag {
    type: 'UPDATE_CONTENT_SELECT_TAG';
    tag: string;
}

export type TagContentsActions = ChangeContentsContents | ChangeContentsSelection | UpdateContentSelectTag;
