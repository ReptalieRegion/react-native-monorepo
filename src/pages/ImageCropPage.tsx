import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { photoPermissionCheck } from '@/utils/permissions/photo-permission';

const ImageCropPage = () => {
    const [photos, setPhotos] = useState<Array<PhotoIdentifier>>([]);
    const numColumns = 4;
    const imageWidth = Dimensions.get('window').width / numColumns;
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        view: {
            flex: 1,
            flexDirection: 'column',
            margin: 1,
        },
        image: {
            justifyContent: 'center',
            alignItems: 'center',
            height: imageWidth,
            width: imageWidth,
        },
    });

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
            renderItem={({ item }) => (
                <View style={styles.view}>
                    <TouchableOpacity>
                        <Image style={styles.image} source={{ uri: item.node.image.uri }} />
                    </TouchableOpacity>
                </View>
            )}
        />
    );
};

export default ImageCropPage;
