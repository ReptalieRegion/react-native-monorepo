import { createContext } from 'react';

import type { TagSearchActions, TagSearchState } from '../types';

export const TagSearchStateContext = createContext<TagSearchState | null>(null);

export const TagSearchActionsContext = createContext<React.Dispatch<TagSearchActions> | null>(null);
