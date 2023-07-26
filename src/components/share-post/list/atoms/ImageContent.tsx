import React from 'react';
import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import { ISharePostsData, TImage } from '<SharePostAPI>';
import sharePostListStore from '@/stores/share-post/list';

type IImagesContentProps = Pick<ISharePostsData, 'images' | 'postId'>;

const { width } = Dimensions.get('screen');

const RenderItem = ({ src, alt }: TImage) => {
    return <Image source={{ uri: src }} alt={alt} style={[styles.image]} resizeMode="cover" />;
};

const ImageContent = ({ images, postId }: IImagesContentProps) => {
    const setCurrentImageIndex = sharePostListStore((state) => state.setCurrentImageIndex);

    const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / (width - 40));
        setCurrentImageIndex(postId, newIndex);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                keyExtractor={(item, index) => item.src + index.toString()}
                renderItem={(info) => <RenderItem {...info.item} />}
                horizontal
                pinchGestureEnabled
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                overScrollMode="never"
                onMomentumScrollEnd={handleScrollEnd}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 6,
        overflow: 'hidden',
    },
    image: {
        minHeight: 250,
        width: width - 40,
    },
});

export default ImageContent;
