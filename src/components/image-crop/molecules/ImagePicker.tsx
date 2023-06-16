import React from 'react';
import { photoPermissionCheck } from '@/utils/permissions/photo-permission';
import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import ImageContent from '../atoms/ImageContent';

const ImagePicker = () => {
    const [photos, setPhotos] = useState<Array<PhotoIdentifier>>([]);
    const numColumns = 4;

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const hasPermission = await photoPermissionCheck();

                if (hasPermission) {
                    const result = await CameraRoll.getPhotos({ first: 20, assetType: 'Photos' });
                    setPhotos(result.edges);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <FlatList
            data={photos}
            keyExtractor={(_, index) => index.toString()}
            numColumns={numColumns}
            renderItem={({ item }) => <ImageContent numColumns={numColumns} item={item} />}
        />
    );
};

export default ImagePicker;
