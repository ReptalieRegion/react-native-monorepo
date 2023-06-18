import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TImageCropState = {
    currentSelectedPhoto: PhotoIdentifier | null;
    selectedPhotos: PhotoIdentifier[];
    photos: PhotoIdentifier[];
};

interface IImageCropActions {
    setCurrentSelectedPhoto: (photo: PhotoIdentifier) => void;
    setSelectedPhotos: (photo: PhotoIdentifier) => void;
    deleteSelectedPhotos: (uri: string) => void;
    findSelectedPhoto: (uri: string) => number;
    addPhotos: (newPhotos: PhotoIdentifier[]) => void;
    initPhotos: (photos: PhotoIdentifier[]) => void;
    reset: () => void;
}

const defaultImageCrop: TImageCropState = {
    currentSelectedPhoto: null,
    selectedPhotos: [],
    photos: [],
};

const imageCropStore = create<TImageCropState & IImageCropActions>()(
    devtools((set, get) => ({
        ...defaultImageCrop,
        setCurrentSelectedPhoto: (photo) => {
            set((state) => ({ ...state, currentSelectedPhoto: photo }));
        },
        setSelectedPhotos: (photo) => {
            const { selectedPhotos } = get();
            const isExistPhoto = selectedPhotos.findIndex(({ node }) => node.image.uri === photo.node.image.uri) !== -1;
            if (isExistPhoto) {
                return;
            }

            set((state) => ({ ...state, selectedPhotos: [...selectedPhotos, photo] }));
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
                selectedPhotos: [...selectedPhotos, firstPhoto],
                photos,
            }));
        },
        reset: () => {
            set(defaultImageCrop);
        },
    })),
);

export default imageCropStore;
