import type { Asset } from 'expo-media-library';
import { create } from 'zustand';

type ThumbnailMap = {
    [key: string]: string;
};

interface GalleryState {
    isLoading: boolean;
    photos: Asset[];
    endCursor: string | undefined;
    hasNextPage: boolean;
    totalCount: number;
    thumbnailMap: ThumbnailMap;
}

interface GalleryActions {
    initAssets: (props: { photos: Asset[]; endCursor: string | undefined; hasNextPage: boolean; totalCount: number }) => void;
    startLoading: () => void;
    setAssets: (props: { photos: Asset[]; endCursor: string | undefined; hasNextPage: boolean; totalCount: number }) => void;
    setThumbnail: (props: { uri: string; thumbnail: string }) => void;
}

const initialState: GalleryState = {
    isLoading: false,
    photos: [],
    endCursor: undefined,
    hasNextPage: true,
    totalCount: 0,
    thumbnailMap: {},
};

export const useGalleryStore = create<GalleryState & GalleryActions>((set, _get) => ({
    ...initialState,
    initAssets({ endCursor, hasNextPage, photos, totalCount }) {
        set((state) => ({
            ...state,
            photos,
            endCursor,
            hasNextPage,
            totalCount,
            isLoading: false,
        }));
    },
    setAssets({ endCursor, hasNextPage, photos, totalCount }) {
        set((state) => ({
            ...state,
            photos: [...state.photos, ...photos],
            endCursor,
            hasNextPage,
            totalCount,
            isLoading: false,
        }));
    },
    setThumbnail({ thumbnail, uri }) {
        set((state) => ({
            ...state,
            thumbnailMap: {
                ...state.thumbnailMap,
                [uri]: thumbnail,
            },
        }));
    },
    startLoading() {
        set((state) => ({
            ...state,
            isLoading: true,
        }));
    },
}));
