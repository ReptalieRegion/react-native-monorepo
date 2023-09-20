import { SelectionType } from './tag';
import { TagContentsState } from './tag-contents';

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
