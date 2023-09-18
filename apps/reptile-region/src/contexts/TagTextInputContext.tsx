import { createContext } from 'react';

import { TagActions, TagState } from '<TagTextInput>';

export const TagTextInputStateContext = createContext<TagState | null>(null);

export const TagTextInputActionContext = createContext<TagActions | null>(null);
