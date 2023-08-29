import { devtools } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

export type SharePostListInfo = {
    [postId: string]: {
        currentImageIndex: number;
        startLikeAnimation: boolean;
        contentMore?: boolean;
    };
};

type SharePostListState = {
    postsOfInfo: SharePostListInfo;
};

interface SharePostListActions {
    setCurrentImageIndex: (postId: string, index: number) => void;
    setStartLikeAnimation: (postId: string, startLikeAnimation: boolean) => void;
}

const useSharePostListStore = createWithEqualityFn<SharePostListState & SharePostListActions>()(
    devtools((set, get) => ({
        postsOfInfo: {},
        setCurrentImageIndex: (postId, index) => {
            const { postsOfInfo } = get();
            const postInfo = postsOfInfo[postId];
            const newPostInfo: SharePostListInfo = {
                [postId]: {
                    ...postInfo,
                    currentImageIndex: index,
                },
            };
            set((state) => ({
                ...state,
                postsOfInfo: {
                    ...postsOfInfo,
                    ...newPostInfo,
                },
            }));
        },
        setStartLikeAnimation: (postId, startLikeAnimation) => {
            const { postsOfInfo } = get();
            const postInfo = postsOfInfo[postId];
            const newPostInfo: SharePostListInfo = {
                [postId]: {
                    ...postInfo,
                    startLikeAnimation,
                },
            };
            set((state) => ({
                ...state,
                postsOfInfo: {
                    ...postsOfInfo,
                    ...newPostInfo,
                },
            }));
        },
    })),
    Object.is,
);
export default useSharePostListStore;
