import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AlbumPicker = () => {
    const openAlbumPicker = async () => {
        await CameraRoll.getAlbums({ assetType: 'All' });
    };

    return (
        <TouchableOpacity onPress={openAlbumPicker}>
            <Text>최근 항목</Text>
        </TouchableOpacity>
    );
};

export default AlbumPicker;
