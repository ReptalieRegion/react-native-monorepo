import { createContext } from 'react';

import { CommentActions, CommentState } from '<context/share-post/comment>';

export const CommentDefaultIdState = createContext<string | null>(null);

export const CommentStateContext = createContext<CommentState | null>(null);

export const CommentActionContext = createContext<React.Dispatch<CommentActions> | null>(null);
