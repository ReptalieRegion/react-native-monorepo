import { TagState } from '<TagTextInput>';

export const INITIAL_TAG_INFO: TagState = {
    contentsInfo: {
        contents: '',
        selection: {
            start: 0,
            end: 0,
        },
    },
    taggingInfo: null,
    searchInfo: {
        keyword: null,
        selection: null,
    },
    moveSelection: null,
} as const;
