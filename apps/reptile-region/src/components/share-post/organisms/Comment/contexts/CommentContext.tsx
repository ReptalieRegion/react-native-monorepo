import { createContext } from 'react';

export type SubmitType = 'UPDATE' | 'CREATE';

export type CommentState = {
    id: string;
    submitType: SubmitType;
};

interface ChangeSubmitType {
    type: 'CHANGE_SUBMIT_TYPE';
    id: string;
    submitType: SubmitType;
}

interface SetCreateSubmitType {
    type: 'SET_CREATE_SUBMIT_TYPE';
    id: string;
}

export type CommentActions = ChangeSubmitType | SetCreateSubmitType;

export const CommentDefaultIdState = createContext<string | null>(null);

export const CommentStateContext = createContext<CommentState | null>(null);

export const CommentActionContext = createContext<React.Dispatch<CommentActions> | null>(null);
