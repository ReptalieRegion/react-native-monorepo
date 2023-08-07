import React, { useEffect, useRef } from 'react';
import { Dimensions, Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { SharePostListData, ShareImageType } from '<SharePostAPI>';
import sharePostListStore from '@/stores/share-post/list';

type ImagesContentProps = Pick<SharePostListData, 'images' | 'postId'>;

const { width } = Dimensions.get('screen');

const RenderItem = ({ src, alt }: ShareImageType) => {
    return <Image source={{ uri: src }} alt={alt} style={[styles.image]} resizeMode="cover" />;
};

const ImageContent = ({ images, postId }: ImagesContentProps) => {
    const prevIndex = useRef(0);
    const setCurrentImageIndex = sharePostListStore((state) => state.setCurrentImageIndex);
    useEffect(() => {
        setCurrentImageIndex(postId, 0);
    }, [postId, setCurrentImageIndex]);

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
                initialNumToRender={2}
                maxToRenderPerBatch={2}
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
