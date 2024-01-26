import { createContext } from 'react';

import type { CommentActions, CommentState } from './types';

export const CommentDefaultIdState = createContext<string | null>(null);

export const CommentStateContext = createContext<CommentState | null>(null);

export const CommentActionContext = createContext<React.Dispatch<CommentActions> | null>(null);
