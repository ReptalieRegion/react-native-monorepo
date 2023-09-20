import { devtools } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

type CommentType = 'comment' | 'commentReply';

export type CommentRegisterType = 'create' | 'update';

type UseCommentState = {
    [key in CommentType]: {
        [key: string]: {
            register: CommentRegisterType;
            commentId?: string;
        };
    };
};

interface UseCommentActions {
    setCommentRegisterType(props: { commentType: CommentType; key: string; type: CommentRegisterType; id: string }): void;
}

const defaultCommentState: UseCommentState = {
    comment: {},
    commentReply: {},
} as const;

const useCommentStore = createWithEqualityFn<UseCommentState & UseCommentActions>()(
    devtools((set) => ({
        ...defaultCommentState,
        setCommentRegisterType({ commentType, key, type, id }) {
            set((state) => ({
                ...state,
                [commentType]: {
                    [key]: {
                        register: type,
                        commentId: id,
                    },
                },
            }));
        },
    })),
    Object.is,
);

export default useCommentStore;
