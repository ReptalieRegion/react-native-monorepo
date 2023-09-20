import { createContext } from 'react';

import { TagSearchActions, TagSearchState } from '../types/tag-search';

export const TagSearchStateContext = createContext<TagSearchState | null>(null);

export const TagSearchActionsContext = createContext<React.Dispatch<TagSearchActions> | null>(null);
