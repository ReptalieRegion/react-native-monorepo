import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const AlbumPicker = () => {
    const openAlbumPicker = async () => {
        const a = await CameraRoll.getAlbums({ assetType: 'All' });
        console.log(a);
    };

    return (
        <TouchableOpacity onPress={openAlbumPicker}>
            <Text>최근 항목</Text>
        </TouchableOpacity>
    );
};

export default AlbumPicker;
