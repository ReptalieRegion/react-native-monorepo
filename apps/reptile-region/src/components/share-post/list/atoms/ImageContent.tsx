import React, { useEffect, useRef } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';

import { ShareImageType } from '<SharePostImage>';
import { SharePostListData } from '<SharePostListAPI>';
import useSharePostListStore from '../../../../stores/share-post/list';

type ImagesContentProps = Pick<SharePostListData, 'images' | 'postId'>;

const { width } = Dimensions.get('screen');

const RenderItem = ({ src }: ShareImageType) => {
    return (
        <FastImage
            source={{
                uri: src,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.web,
            }}
            style={[styles.image]}
            resizeMode={FastImage.resizeMode.cover}
        />
    );
};

const ImageContent = ({ images, postId }: ImagesContentProps) => {
    const prevIndex = useRef(0);
    const setCurrentImageIndex = useSharePostListStore((state) => state.setCurrentImageIndex);
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
