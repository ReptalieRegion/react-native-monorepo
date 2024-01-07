import type { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';

// 사진 파싱
export function _parsingPhoto(photo: PhotoIdentifier | undefined) {
    if (photo) {
        const { uri, filename, width, height } = photo.node.image;
        const newFilename = filename ?? `image_${Math.floor(Math.random() * 9999)}_${new Date().getTime()}.jpg`;
        return {
            uri,
            filename: newFilename,
            width,
            height,
        };
    }

    return null;
}
