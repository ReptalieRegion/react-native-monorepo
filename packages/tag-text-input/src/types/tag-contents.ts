import { SelectionType } from './tag';

/** TextInput의 정보 */
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
