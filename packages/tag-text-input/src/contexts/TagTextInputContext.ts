import { createContext } from 'react';

import { TagTextInputActions, TagTextInputState } from '../types/tag-text-input';

export const TagTextInputStateContext = createContext<TagTextInputState | null>(null);

export const TagTextInputActionsContext = createContext<TagTextInputActions | null>(null);
