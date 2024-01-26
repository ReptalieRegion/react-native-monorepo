import type { TagContentsState } from '../types';

export const DEFAULT_CONTENT: TagContentsState = {
    contents: '',
    selection: {
        start: 0,
        end: 0,
    },
};
