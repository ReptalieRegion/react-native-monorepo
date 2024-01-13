import type { Photo } from '@crawl/camera-album';
import type { CropInfo } from '@crawl/image-crop';

type CreatePostState = {
    croppedImage: Photo[];
    cropInfoMap: {
        [key: string]: CropInfo;
    };
};

interface SetCropInfo {
    type: 'SET_CROP_INFO';
    cropInfo: CropInfo;
    uri: string;
}

interface SetCroppedPhoto {
    type: 'SET_CROPPED_PHOTO';
    croppedPhoto: Photo[];
}

type CreatePostActions = SetCropInfo | SetCroppedPhoto;

export type { CreatePostActions, CreatePostState, SetCropInfo, SetCroppedPhoto };
