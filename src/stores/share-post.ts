import { MAX_SELECT_PHOTO_COUNT } from '@/const/image';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TSharePostState = {
    currentSelectedPhoto: PhotoIdentifier | null;
    selectedPhotos: PhotoIdentifier[];
    photos: PhotoIdentifier[];
    postContent: string;
};

interface ISharePostActions {
    setSelectedPhotos: (photo: PhotoIdentifier) => 'limit' | 'success' | 'exists';
    deleteSelectedPhotos: (uri: string) => void;
    findSelectedPhoto: (uri: string) => number;
    addPhotos: (newPhotos: PhotoIdentifier[]) => void;
    initPhotos: (photos: PhotoIdentifier[]) => void;
    setPostContent: (content: string) => void;
    reset: () => void;
}

const defaultSharePost: TSharePostState = {
    currentSelectedPhoto: null,
    selectedPhotos: [],
    photos: [],
    postContent: '',
};

const SharePostStore = create<TSharePostState & ISharePostActions>()(
    devtools((set, get) => ({
        ...defaultSharePost,
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
        setPostContent: (content) => {
            set((state) => ({ ...state, postContent: content }));
        },
        deleteSelectedPhotos: (uri) => {
            const { selectedPhotos } = get();
            const filteredSelectedPhotos = selectedPhotos.filter(({ node }) => node.image.uri !== uri);
            const lastIndex = filteredSelectedPhotos.length !== 0 ? filteredSelectedPhotos.length - 1 : 0;

            set((state) => ({
                ...state,
                selectedPhotos: filteredSelectedPhotos,
                currentSelectedPhoto: filteredSelectedPhotos[lastIndex],
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
);

export default SharePostStore;
