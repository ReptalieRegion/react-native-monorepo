import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { TouchableTypo } from 'design-system';
import React from 'react';

const AlbumPicker = () => {
    const openAlbumPicker = async () => {
        await CameraRoll.getAlbums({ assetType: 'All' });
    };

    return <TouchableTypo onPress={openAlbumPicker}>최근항목</TouchableTypo>;
};

export default AlbumPicker;
