import React, { useCallback, useRef } from 'react';
import { Dimensions, ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';

import { ShareImageType } from '<SharePostImage>';
import { SharePostListData } from '<SharePostListAPI>';
import useSharePostListStore from '@/stores/share-post/list';

type ImagesContentProps = {
    post: Pick<SharePostListData['post'], 'images' | 'id'>;
};

const { width } = Dimensions.get('screen');

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
                keyExtractor={keyExtractor}
                renderItem={renderItem}
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
