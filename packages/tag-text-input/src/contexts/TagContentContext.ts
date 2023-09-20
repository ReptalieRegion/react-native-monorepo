import { createContext } from 'react';

import { TagContentsActions, TagContentsState } from '../types/tag-contents';

export const TagContentStateContext = createContext<TagContentsState | null>(null);

export const TagContentActionsContext = createContext<React.Dispatch<TagContentsActions> | null>(null);
