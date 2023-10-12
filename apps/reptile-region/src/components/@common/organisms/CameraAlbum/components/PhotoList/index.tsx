import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useCameraAlbumHandler from '../../hooks/useCameraAlbumHandler';
import usePhoto from '../../hooks/usePhoto';
import usePhotoSelect from '../../hooks/usePhotoSelect';
import PhotoIndicators from '../PhotoIndicators';

import SquareImage from '@/components/@common/atoms/SquareImage';
import { useToast } from '@/overlay/Toast';

type ExtraData = {
    selectPhotoLength: number;
};

type PhotoListProps = {
    numColumns: number;
    loadPhotoLimit: number;
};

export default function PhotoList({ numColumns = 4, loadPhotoLimit = 60 }: PhotoListProps) {
    const { width } = useWindowDimensions();
    const imageWidth = width / numColumns - 2;

    const { photos } = usePhoto();
    const { selectedPhotos } = usePhotoSelect();
    const { selectPhoto, loadPhotos, initPhotos } = useCameraAlbumHandler();
    const { openToast } = useToast();
    const newExtraData: ExtraData = {
        selectPhotoLength: selectedPhotos.length,
    };

    const renderItem: ListRenderItem<PhotoIdentifier> = ({ item, extraData }) => {
        const uri = item.node.image.uri;
        const { selectPhotoLength } = extraData as ExtraData;
        const handlePressImage = () => {
            if (selectPhotoLength < 5) {
                selectPhoto({ photo: item });
            } else {
                openToast({ contents: '이미지 개수 초과', severity: 'error' });
            }
        };

        return (
            <TouchableOpacity onPress={handlePressImage} activeOpacity={0.5}>
                <View style={[styles.photoItemContainer, { width: imageWidth, height: imageWidth }]}>
                    <SquareImage image={{ src: uri }} size={imageWidth} />
                    <View style={styles.photoIndicators}>
                        <PhotoIndicators uri={uri} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        initPhotos({ first: loadPhotoLimit });
    }, [initPhotos, loadPhotoLimit]);

    const loadMorePhotos = useCallback(async () => {
        const lastPhoto = photos?.at(-1)?.node.image.uri;
        await loadPhotos({ first: loadPhotoLimit, after: lastPhoto, assetType: 'Photos' });
    }, [loadPhotoLimit, loadPhotos, photos]);

    return (
        <View style={styles.container}>
            <FlashList
                data={photos}
                extraData={newExtraData}
                numColumns={numColumns}
                contentContainerStyle={styles.squareContainer}
                keyExtractor={(item) => item.node.image.uri}
                onEndReached={loadMorePhotos}
                renderItem={renderItem}
                estimatedItemSize={imageWidth}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    squareContainer: {
        paddingBottom: 16,
    },
    photoItemContainer: {
        position: 'relative',
        margin: 1,
    },
    photoIndicators: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
});
