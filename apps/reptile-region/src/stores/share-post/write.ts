import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { devtools } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

export const MAX_SELECT_PHOTO_COUNT = 5;

type SelectionType = {
    start: number;
    end: number;
};

type SearchInfo = {
    isStart: boolean;
    keyword: string;
    selection: SelectionType | null;
};

type SharePostWriteState = {
    search: SearchInfo;
    contents: string;
    currentSelectedPhoto: PhotoIdentifier | null;
    selectedPhotos: PhotoIdentifier[];
    photos: PhotoIdentifier[];
};

interface SharePostWriteActions {
    resetSearchInfo: () => void;
    setSearchInfo: (selection: SelectionType) => void;
    setContents: (contents: string) => void;
    setSelectedPhotos: (photo: PhotoIdentifier) => 'limit' | 'success' | 'exists';
    deleteSelectedPhotos: (uri: string) => void;
    findSelectedPhoto: (uri: string) => number;
    addPhotos: (newPhotos: PhotoIdentifier[]) => void;
    initPhotos: (photos: PhotoIdentifier[]) => void;
    reset: () => void;
}

const defaultSharePost: SharePostWriteState = {
    search: {
        isStart: false,
        keyword: '',
        selection: null,
    },
    contents: '',
    currentSelectedPhoto: null,
    selectedPhotos: [],
    photos: [],
};

const useSharePostWriteStore = createWithEqualityFn<SharePostWriteState & SharePostWriteActions>()(
    devtools((set, get) => ({
        ...defaultSharePost,
        resetSearchInfo: () => {
            set((state) => ({
                ...state,
                search: {
                    isStart: false,
                    keyword: '',
                    selection: null,
                },
            }));
        },
        setSearchInfo: (selection) => {
            set((state) => ({
                ...state,
                search: {
                    isStart: true,
                    keyword: state.contents.slice(selection.start, selection.end),
                    selection,
                },
            }));
        },
        setSelectedPhotos: (photo) => {
            const { selectedPhotos } = get();
            const isExistPhoto = selectedPhotos.findIndex(({ node }) => node.image.uri === photo.node.image.uri) !== -1;
            if (isExistPhoto) {
                set((state) => ({ ...state, currentSelectedPhoto: photo }));
                return 'exists';
            }

            const isLimitPhotos = selectedPhotos.length >= MAX_SELECT_PHOTO_COUNT;
            if (isLimitPhotos) {
                return 'limit';
            }

            set((state) => ({ ...state, currentSelectedPhoto: photo, selectedPhotos: [...selectedPhotos, photo] }));
            return 'success';
        },
        setContents: (contents) => {
            set((state) => ({ ...state, contents }));
        },
        deleteSelectedPhotos: (uri) => {
            const { selectedPhotos } = get();
            const filteredSelectedPhotos = selectedPhotos.filter(({ node }) => node.image.uri !== uri);
            const currentSelectedPhoto =
                filteredSelectedPhotos.length !== 0
                    ? filteredSelectedPhotos[filteredSelectedPhotos.length - 1]
                    : selectedPhotos[0];

            set((state) => ({
                ...state,
                selectedPhotos: filteredSelectedPhotos,
                currentSelectedPhoto,
            }));
        },
        findSelectedPhoto: (uri: string) => {
            const { selectedPhotos } = get();
            return selectedPhotos.findIndex(({ node }) => node.image.uri === uri);
        },
        addPhotos: (newPhotos) => {
            const { photos } = get();
            set((state) => ({ ...state, photos: [...photos, ...newPhotos] }));
        },
        initPhotos: (photos) => {
            const { selectedPhotos } = get();
            const firstPhoto = photos[0];

            set((state) => ({
                ...state,
                currentSelectedPhoto: firstPhoto,
                selectedPhotos: [...selectedPhotos],
                photos,
            }));
        },
        reset: () => {
            set(defaultSharePost);
        },
    })),
    Object.is,
);

export default useSharePostWriteStore;
