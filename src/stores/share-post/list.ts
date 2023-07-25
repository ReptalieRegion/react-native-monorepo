import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type SharePostListInfo = {
    [postId: string]: {
        imageIndex: number;
        startLikeAnimation: boolean;
    };
};

type SharePostListState = {
    postsOfInfo: SharePostListInfo;
};

interface SharePostListActions {
    setCurrentImageIndex: (postId: string, index: number) => void;
    setStartLikeAnimation: (postId: string, startLikeAnimation: boolean) => void;
}

const sharePostListStore = create<SharePostListState & SharePostListActions>()(
    devtools((set, get) => ({
        postsOfInfo: {},
        setCurrentImageIndex: (postId, index) => {
            const { postsOfInfo } = get();
            const postInfo = postsOfInfo[postId];
            const newPostInfo: SharePostListInfo = {
                [postId]: {
                    ...postInfo,
                    imageIndex: index,
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
);
export default sharePostListStore;
