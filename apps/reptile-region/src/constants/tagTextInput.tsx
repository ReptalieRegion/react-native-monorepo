import { TagState } from '<TagTextInput>';

export const INITIAL_TAG_INFO: TagState = {
    contentsInfo: {
        contents: '',
        selection: null,
    },
    taggingInfo: null,
    searchInfo: {
        keyword: null,
        selection: null,
    },
} as const;
