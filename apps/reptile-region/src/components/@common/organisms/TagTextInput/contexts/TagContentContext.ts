import { createContext } from 'react';

import type { TagContentsActions, TagContentsState } from '../type';

export const TagContentStateContext = createContext<TagContentsState | null>(null);

export const TagContentActionsContext = createContext<React.Dispatch<TagContentsActions> | null>(null);
