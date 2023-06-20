import React from 'react';
import { FlatList, View } from 'react-native';
import imageCropStore from '@/stores/image-crop';
import RenderImage from '../atoms/RenderImage';
import SharePostWriteTitle from '../atoms/SharePostWriteTitle';

const PhotoRegister = () => {
    const { selectedPhotos } = imageCropStore();

    return (
        <View>
            <SharePostWriteTitle title="사진 등록" />
            <FlatList
                data={selectedPhotos}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <RenderImage item={item} />}
                keyExtractor={(item) => item.node.image.uri}
            />
        </View>
    );
};

export default PhotoRegister;
