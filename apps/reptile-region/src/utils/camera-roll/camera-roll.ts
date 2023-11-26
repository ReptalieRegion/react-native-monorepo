import type { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Platform } from 'react-native';

const IOSUploadImage = async (uri: string, filename: string | null) => {
    const isCroppedURL = uri.startsWith('file://');
    if (isCroppedURL) {
        return {
            uri: uri.replace('file://', ''),
            filename,
            type: 'image/jpeg',
        };
    }

    const fileData = await CameraRoll.iosGetImageDataById(uri, true);
    return {
        uri: fileData.node.image.filepath,
        name: fileData.node.image.filename,
        type: 'image/jpeg',
    };
};

export const uploadImage = async (photo: PhotoIdentifier) => {
    const { uri, filename } = photo.node.image;
    if (Platform.OS === 'ios') {
        return IOSUploadImage(uri, filename);
    }

    return {
        uri,
        name: filename,
        type: 'image/jpeg',
    };
};
