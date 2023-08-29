import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import React, { useCallback, useRef } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import type { ShareImageType } from '<Image>';
import { SharePostListData } from '<SharePostAPI>';
import useSharePostListStore from '@/stores/share-post/list';

type ImagesContentProps = {
    post: Pick<SharePostListData['post'], 'images' | 'id'>;
};

const { width } = Dimensions.get('screen');
const IMAGE_WIDTH = width - 40;

const ImageContent = ({ post }: ImagesContentProps) => {
    const { id: postId, images } = post;

    const prevIndex = useRef(0);
    const setCurrentImageIndex = useSharePostListStore((state) => state.setCurrentImageIndex);

    const keyExtractor = useCallback((item: ShareImageType, index: number) => item.src + index.toString(), []);
    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<ShareImageType>) => (
            <FastImage
                source={{
                    uri: item.src,
                    priority: FastImage.priority.high,
                    cache: FastImage.cacheControl.web,
                }}
                style={[styles.image]}
                resizeMode={FastImage.resizeMode.cover}
            />
        ),
        [],
    );

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / IMAGE_WIDTH);
        if (prevIndex.current !== newIndex) {
            prevIndex.current = newIndex;
            setCurrentImageIndex(postId, newIndex);
        }
    };

    return (
        <View style={styles.container}>
            <FlashList
                data={images}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                horizontal
                pinchGestureEnabled
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                overScrollMode="never"
                onScroll={handleScroll}
                scrollEventThrottle={16}
                estimatedItemSize={IMAGE_WIDTH}
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
        width: IMAGE_WIDTH,
    },
});

export default ImageContent;
