import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React, { useCallback, useRef } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { shallow } from 'zustand/shallow';

import type { ShareImageType } from '<Image>';
import { SharePostListData } from '<SharePostAPI>';
import { color } from '@/components/common/tokens/colors';
import useSharePostListStore from '@/stores/share-post/useSharePostListStore';

type ImagesContentProps = {
    post: Pick<SharePostListData['post'], 'images' | 'id'>;
};

const { width } = Dimensions.get('screen');
const IMAGE_WIDTH = width - 40;

const ImageContent = ({ post }: ImagesContentProps) => {
    const { id: postId, images } = post;

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
    const renderItem = useCallback(({ item, index }: ListRenderItemInfo<ShareImageType>) => {
        const isFirstImage = index === 0;

        return (
            <Animated.View style={styles.imageBackground}>
                <Image
                    key={item.src}
                    source={{
                        uri: item.src,
                    }}
                    priority={isFirstImage ? 'high' : 'low'}
                    style={[styles.image]}
                    contentFit="cover"
                />
            </Animated.View>
        );
    }, []);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / IMAGE_WIDTH);
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
                estimatedListSize={{ height: 250, width: IMAGE_WIDTH }}
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
        height: 250,
        maxHeight: 250,
        minWidth: IMAGE_WIDTH,
        width: IMAGE_WIDTH,
        maxWidth: IMAGE_WIDTH,
    },
    imageBackground: {
        backgroundColor: color.Gray[250].toString(),
    },
});

export default ImageContent;
