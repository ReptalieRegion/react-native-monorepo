import { createContext } from 'react';

import type { TagTextInputActions, TagTextInputState } from '../type';

export const TagTextInputStateContext = createContext<TagTextInputState | null>(null);

export const TagTextInputActionsContext = createContext<TagTextInputActions | null>(null);
