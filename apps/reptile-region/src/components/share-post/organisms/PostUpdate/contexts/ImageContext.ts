import { createContext } from 'react';

import type { PostUpdateImageActions, PostUpdateImageState } from '../types';

export const ImageStateContext = createContext<PostUpdateImageState | null>(null);

export const ImageActionsContext = createContext<React.Dispatch<PostUpdateImageActions> | null>(null);
