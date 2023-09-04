import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { devtools } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

export const MAX_SELECT_PHOTO_COUNT = 5;

type ImageStoreState = {
    currentSelectedPhoto: PhotoIdentifier | null;
    selectedPhotos: PhotoIdentifier[];
    photos: PhotoIdentifier[];
};

interface ImageStoreAction {
    initPhotos: (photos: PhotoIdentifier[]) => void;
    addPhotos: (photos: PhotoIdentifier[]) => void;
    findSelectedPhoto: (uri: string) => number;
    getImageState: (uri: string) => 'change' | 'limit' | 'delete' | 'add';
    changeCurrentSelectedPhoto: (photo: PhotoIdentifier) => void;
    deleteSelectedPhoto: (uri: string) => void;
    addSelectedPhoto: (uri: PhotoIdentifier) => void;
    reset: () => void;
}

const defaultImageStore: Readonly<ImageStoreState> = {
    currentSelectedPhoto: null,
    selectedPhotos: [],
    photos: [],
};

const usePhotoStore = createWithEqualityFn<ImageStoreState & ImageStoreAction>()(
    devtools((set, get) => ({
        ...defaultImageStore,
        getImageState: (uri) => {
            const { selectedPhotos, currentSelectedPhoto } = get();
            const isCurrentSelectedPhoto = selectedPhotos.length !== 0 && currentSelectedPhoto?.node.image.uri === uri;
            if (isCurrentSelectedPhoto) {
                return 'delete';
            }

            const isExistPhoto = selectedPhotos.findIndex(({ node }) => node.image.uri === uri) !== -1;
            if (isExistPhoto) {
                return 'change';
            }

            const isLimitPhotos = selectedPhotos.length >= MAX_SELECT_PHOTO_COUNT;
            if (isLimitPhotos) {
                return 'limit';
            }

            return 'add';
        },
        initPhotos: (photos) => {
            const firstPhoto = photos[0];
            set((state) => ({
                ...state,
                currentSelectedPhoto: firstPhoto,
                photos,
            }));
        },
        deleteSelectedPhoto: (uri) => {
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
        changeCurrentSelectedPhoto: (photo) => {
            set((state) => ({ ...state, currentSelectedPhoto: photo }));
            return;
        },
        addSelectedPhoto: (photo) => {
            const { selectedPhotos } = get();
            set((state) => ({ ...state, currentSelectedPhoto: photo, selectedPhotos: [...selectedPhotos, photo] }));
        },
        findSelectedPhoto: (uri) => {
            const { selectedPhotos } = get();
            return selectedPhotos.findIndex(({ node }) => node.image.uri === uri);
        },
        addPhotos: (photos) => {
            set((state) => ({ ...state, photos: [...state.photos, ...photos] }));
        },
        reset: () => {
            set(defaultImageStore);
        },
    })),
    Object.is,
);

export default usePhotoStore;
