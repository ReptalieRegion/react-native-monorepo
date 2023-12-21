import { createContext } from 'react';

import type { CreatePostActions, CreatePostState } from './type';

export const CreatePostStateContext = createContext<CreatePostState | null>(null);

export const CreatePostActionsContext = createContext<React.Dispatch<CreatePostActions> | null>(null);
