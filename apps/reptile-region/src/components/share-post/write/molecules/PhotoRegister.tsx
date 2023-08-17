import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import RenderImage from '../atoms/RenderImage';
import SharePostWriteTitle from '../atoms/SharePostWriteTitle';

import useSharePostWriteStore from '../../../../stores/share-post/write';

const PhotoRegister = () => {
    const selectedPhotos = useSharePostWriteStore((state) => state.selectedPhotos);

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
