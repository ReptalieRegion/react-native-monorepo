import React, { ReactNode, useReducer } from 'react';
import { TagProvider } from 'tag-text-input';

import CommentTextInputEditor from '../components/TextInputEditor';
import { CommentActionContext, CommentStateContext } from '../contexts/CommentContext';
import commentReducer from '../reducer/comment-reducer';

type CommentProps = {
    children: ReactNode;
};

export default function Comment({ children }: CommentProps) {
    const [state, dispatch] = useReducer(commentReducer, { id: '', submitType: 'CREATE' });

    return (
        <TagProvider>
            <CommentActionContext.Provider value={dispatch}>
                <CommentStateContext.Provider value={state}>{children}</CommentStateContext.Provider>
            </CommentActionContext.Provider>
        </TagProvider>
    );
}

Comment.TextInputEditor = CommentTextInputEditor;
