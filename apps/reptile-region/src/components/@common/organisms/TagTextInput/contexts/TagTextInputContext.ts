import { createContext } from 'react';

import type { TagTextInputActions, TagTextInputState } from '../types';

export const TagTextInputStateContext = createContext<TagTextInputState | null>(null);

export const TagTextInputActionsContext = createContext<TagTextInputActions | null>(null);
