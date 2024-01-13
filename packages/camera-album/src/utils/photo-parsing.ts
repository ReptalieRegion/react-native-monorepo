import type { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';

// 사진 파싱
export function convertPhoto(photo: PhotoIdentifier) {
    const uri = photo.node.image.uri;
    const filename = photo.node.image.filename;
    const width = photo.node.image.width;
    const height = photo.node.image.height;
    const newFilename = filename ?? `image_${Math.floor(Math.random() * 9999)}_${new Date().getTime()}.jpg`;

    return {
        uri,
        filename: newFilename,
        width,
        height,
    };
}

export function convertPhotos(photos: PhotoIdentifier[]) {
    return photos.map(convertPhoto);
}
