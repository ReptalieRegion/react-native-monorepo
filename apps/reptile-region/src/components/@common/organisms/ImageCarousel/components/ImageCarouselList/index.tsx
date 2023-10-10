import { FlashList, FlashListProps, ListRenderItemInfo } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';

import useImageCarouselHandler from '../../hooks/useImageCarouselHandler';
import useImageCarouselRef from '../../hooks/useImageCarouselRef';

import { ImageType } from '<image>';

export type ImageCarouselProps = {
    images: ImageType[];
    ImageItemOverlay?: (props: { image: ImageType }) => React.JSX.Element;
    width: number;
    height: number;
} & Omit<
    FlashListProps<ImageType>,
    | 'data'
    | 'keyExtractor'
    | 'renderItem'
    | 'estimatedListSize'
    | 'estimatedItemSize'
    | 'horizontal'
    | 'pagingEnabled'
    | 'showsHorizontalScrollIndicator'
>;

const TEMP = 'https://reptalie-region.s3.ap-northeast-2.amazonaws.com/';

export default function ImageCarouselList({ images, width, height, ImageItemOverlay, onScroll, ...rest }: ImageCarouselProps) {
    const { imageCarouselRef } = useImageCarouselRef();
    const { handleScrollCalcIndicator } = useImageCarouselHandler();

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        onScroll?.(event);
        handleScrollCalcIndicator({ contentOffsetX: event.nativeEvent.contentOffset.x, imageWidth: width });
    };

    const keyExtractor = (_: ImageType, index: number) => index.toString();

    const renderItem = ({ item, index }: ListRenderItemInfo<ImageType>) => {
        const isFirstImage = index === 0;
        const priority = isFirstImage ? 'high' : 'low';
        const recyclingKey = item.src;
        const uri = item.src.replace(TEMP, '');
        const newUri = uri.startsWith('https') ? uri : TEMP + uri;

        return (
            <View style={[styles.itemContainer, { width, height }]}>
                <Image
                    source={{ uri: newUri, width, height }}
                    priority={priority}
                    recyclingKey={recyclingKey}
                    style={{ width, height }}
                    contentFit="cover"
                    placeholderContentFit="cover"
                    placeholder={require('@/assets/images/default_image.png')}
                />
                {ImageItemOverlay ? (
                    <View style={[styles.overlayItemContainer, { width, height }]}>{<ImageItemOverlay image={item} />}</View>
                ) : null}
            </View>
        );
    };

    return (
        <FlashList
            ref={imageCarouselRef}
            data={images}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            onScroll={handleScroll}
            estimatedListSize={{ height, width }}
            estimatedItemSize={width}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        position: 'relative',
    },
    overlayItemContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
    },
});
