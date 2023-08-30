import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import React from 'react';
import { View } from 'react-native';

import RenderImage from '../atoms/RenderImage';
import SharePostWriteTitle from '../atoms/SharePostWriteTitle';

import useSharePostWriteStore from '@/stores/share-post/write';

const PhotoRegister = () => {
    const selectedPhotos = useSharePostWriteStore((state) => state.selectedPhotos);

    const keyExtractor = (item: PhotoIdentifier) => item.node.image.uri;
    const renderItem = ({ item, index }: ListRenderItemInfo<PhotoIdentifier>) => (
        <RenderImage item={item} isLastImage={selectedPhotos.length - 1 === index} />
    );

    return (
        <View>
            <SharePostWriteTitle title="사진 등록" />
            <FlashList
                horizontal
                data={selectedPhotos}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default PhotoRegister;
