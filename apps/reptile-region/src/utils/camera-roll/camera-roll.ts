import type { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Platform } from 'react-native';

const IOSUploadImage = async (uri: string) => {
    const fileData = await CameraRoll.iosGetImageDataById(uri, true);
    const { filename, filepath } = fileData.node.image;

    return {
        uri: filepath,
        name: filename,
        type: 'image/jpeg',
    };
};

export const uploadImage = async (photo: PhotoIdentifier) => {
    const { uri, filename } = photo.node.image;
    if (Platform.OS === 'ios') {
        return IOSUploadImage(uri);
    }

    return {
        uri,
        name: filename,
        type: 'image/jpeg',
    };
};
