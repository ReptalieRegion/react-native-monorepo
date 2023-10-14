import React, { useReducer } from 'react';
import type { ReactNode } from 'react';

import CommentTextInputEditor from '../components/TextInputEditor';
import { CommentActionContext, CommentDefaultIdState, CommentStateContext } from '../contexts/CommentContext';
import commentReducer from '../reducer/comment-reducer';

import { TagProvider } from '@/components/@common/organisms/TagTextInput';

type CommentProps = {
    id: string;
    children: ReactNode;
};

export default function Comment({ id, children }: CommentProps) {
    const [state, dispatch] = useReducer(commentReducer, { id, submitType: 'CREATE' });

    return (
        <CommentDefaultIdState.Provider value={id}>
            <TagProvider>
                <CommentActionContext.Provider value={dispatch}>
                    <CommentStateContext.Provider value={state}>{children}</CommentStateContext.Provider>
                </CommentActionContext.Provider>
            </TagProvider>
        </CommentDefaultIdState.Provider>
    );
}

Comment.TextInputEditor = CommentTextInputEditor;
