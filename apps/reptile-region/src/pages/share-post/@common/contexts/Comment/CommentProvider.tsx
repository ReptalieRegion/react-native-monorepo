import type { ReactNode } from 'react';
import React, { useReducer } from 'react';

import commentReducer from './comment-reducer';
import { CommentActionContext, CommentDefaultIdState, CommentStateContext } from './CommentContext';

import { TagProvider } from '@/pages/share-post/@common/contexts/TagTextInput';

type CommentProps = {
    id: string;
    children: ReactNode;
};

export default function CommentProvider({ id, children }: CommentProps) {
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
