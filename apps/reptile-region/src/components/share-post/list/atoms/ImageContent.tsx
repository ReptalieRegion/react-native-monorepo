import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { color } from 'design-system';
import { Image } from 'expo-image';
import React, { useCallback, useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View, useWindowDimensions } from 'react-native';
import { shallow } from 'zustand/shallow';

import type { ImageType } from '<image>';
import useSharePostListStore from '@/stores/share-post/useSharePostListStore';

type ImagesContentProps = {
    post: {
        id: string;
        images: ImageType[];
    };
};

export default function ImageContent({ post: { id: postId, images } }: ImagesContentProps) {
    /** UI 시작 */
    const { width } = useWindowDimensions();
    const imageWidth = width - 40;
    /** UI 끝 */

    /** FlashList 시작 */
    const flashRef = useRef<FlashList<ImageType>>(null);
    const lastItemId = useRef(postId);
    if (lastItemId.current !== postId) {
        lastItemId.current = postId;
        flashRef.current?.scrollToIndex({ index: 0 });
    }

    const keyExtractor = useCallback((_: ImageType, index: number) => index.toString(), []);

    const renderItem = useCallback(
        ({ item, index }: ListRenderItemInfo<ImageType>) => {
            const isFirstImage = index === 0;
            const priority = isFirstImage ? 'high' : 'low';
            const source = { uri: item.src.replace('https://reptalie-region.s3.ap-northeast-2.amazonaws.com/', '') };
            const recyclingKey = item.src;

            return (
                <Image
                    source={source}
                    priority={priority}
                    recyclingKey={recyclingKey}
                    style={[styles.image, { width: imageWidth }]}
                    contentFit="cover"
                    placeholder={require('@/assets/images/default_image.png')}
                    placeholderContentFit="cover"
                />
            );
        },
        [imageWidth],
    );
    /** FlashList 끝 */

    /** 현재 이미지 인덱스 계산 로직 시작 */
    const { currentImageIndex, setCurrentImageIndex } = useSharePostListStore(
        (state) => ({
            currentImageIndex: state.postsOfInfo[postId]?.currentImageIndex ?? 0,
            setCurrentImageIndex: state.setCurrentImageIndex,
        }),
        shallow,
    );

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / imageWidth);
        if (currentImageIndex !== newIndex) {
            setCurrentImageIndex(postId, newIndex);
        }
    };
    /** 현재 이미지 인덱스 계산 로직 끝 */

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
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 6,
        overflow: 'hidden',
    },
    image: {
        height: 300,
    },
    imageBackground: {
        backgroundColor: color.Gray[250].toString(),
    },
});
