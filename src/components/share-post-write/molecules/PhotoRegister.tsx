import React from 'react';
import { FlatList, View } from 'react-native';
import SharePostStore from '@/stores/share-post';
import RenderImage from '../atoms/RenderImage';
import SharePostWriteTitle from '../atoms/SharePostWriteTitle';

const PhotoRegister = () => {
    const selectedPhotos = SharePostStore((state) => state.selectedPhotos);

    return (
        <View>
            <SharePostWriteTitle title="사진 등록" />
            <FlatList
                data={selectedPhotos}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => <RenderImage item={item} isLastImage={selectedPhotos.length - 1 === index} />}
                keyExtractor={(item) => item.node.image.uri}
            />
        </View>
    );
};

export default PhotoRegister;
