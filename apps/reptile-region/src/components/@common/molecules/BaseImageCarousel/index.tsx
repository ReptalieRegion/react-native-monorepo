import type { FlashListProps, ListRenderItemInfo } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { ImageType } from '@/types/global/image';
import { imageUriParsing } from '@/utils/development';

export type BaseImageCarouselProps = {
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

export default React.forwardRef<FlashList<ImageType>, BaseImageCarouselProps>(function BaseImageCarousel(
    { images, width, height, ImageItemOverlay, ...rest },
    ref,
) {
    const keyExtractor = (_: ImageType, index: number) => index.toString();

    const renderItem = ({ item, index }: ListRenderItemInfo<ImageType>) => {
        const isFirstImage = index === 0;
        const priority = isFirstImage ? 'high' : 'low';
        const recyclingKey = item.src;
        const newUri = imageUriParsing(item.src);

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
            ref={ref}
            data={images}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            estimatedListSize={{ height, width }}
            estimatedItemSize={width}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            {...rest}
        />
    );
});

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
