import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { color } from 'design-system';
import { Image } from 'expo-image';
import React, { useCallback, useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View, useWindowDimensions } from 'react-native';
import { shallow } from 'zustand/shallow';

import type { ShareImageType } from '<Image>';
import { SharePostListData } from '<SharePostAPI>';
import useSharePostListStore from '@/stores/share-post/useSharePostListStore';

type ImagesContentProps = {
    post: Pick<SharePostListData['post'], 'images' | 'id'>;
};

const ImageContent = ({ post }: ImagesContentProps) => {
    const { id: postId, images } = post;
    const { width } = useWindowDimensions();
    const imageWidth = width - 40;

    const { currentImageIndex, setCurrentImageIndex } = useSharePostListStore(
        (state) => ({
            currentImageIndex: state.postsOfInfo[postId]?.currentImageIndex ?? 0,
            setCurrentImageIndex: state.setCurrentImageIndex,
        }),
        shallow,
    );
    const flashRef = useRef<FlashList<ShareImageType>>(null);
    const lastItemId = useRef(postId);
    if (lastItemId.current !== postId) {
        lastItemId.current = postId;
        flashRef.current?.scrollToIndex({ index: 0 });
    }

    const keyExtractor = useCallback((_: ShareImageType, index: number) => index.toString(), []);
    const renderItem = useCallback(
        ({ item, index }: ListRenderItemInfo<ShareImageType>) => {
            const isFirstImage = index === 0;

            return (
                <Image
                    recyclingKey={item.src}
                    source={{
                        uri: item.src,
                    }}
                    priority={isFirstImage ? 'high' : 'low'}
                    style={[styles.image, { width: imageWidth }]}
                    contentFit="cover"
                    placeholder={require('@/assets/images/default_image.png')}
                    placeholderContentFit="cover"
                />
            );
        },
        [imageWidth],
    );

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / imageWidth);
        if (currentImageIndex !== newIndex) {
            setCurrentImageIndex(postId, newIndex);
        }
    };

    return (
        <View style={styles.container}>
            <FlashList
                ref={flashRef}
                data={images}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                horizontal
                pinchGestureEnabled
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                estimatedListSize={{ height: 250, width: imageWidth }}
                estimatedItemSize={imageWidth}
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
        height: 250,
    },
    imageBackground: {
        backgroundColor: color.Gray[250].toString(),
    },
});

export default ImageContent;
