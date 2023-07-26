import React, { useRef } from 'react';
import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import { ISharePostsData, TImage } from '<SharePostAPI>';
import sharePostListStore from '@/stores/share-post/list';

type ImagesContentProps = Pick<ISharePostsData, 'images' | 'postId'>;

const { width } = Dimensions.get('screen');

const RenderItem = ({ src, alt }: TImage) => {
    return <Image source={{ uri: src }} alt={alt} style={[styles.image]} resizeMode="cover" />;
};

const ImageContent = ({ images, postId }: ImagesContentProps) => {
    const prevIndex = useRef(0);
    const setCurrentImageIndex = sharePostListStore((state) => state.setCurrentImageIndex);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / (width - 40));
        if (prevIndex.current !== newIndex) {
            prevIndex.current = newIndex;
            setCurrentImageIndex(postId, newIndex);
        }
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
                onScroll={handleScroll}
                scrollEventThrottle={16}
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
