import { FlashList, FlashListProps, ListRenderItemInfo } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React from 'react';

import { ImageType } from '<image>';

export type ImageCarouselProps = {
    images: ImageType[];
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

export default React.forwardRef<FlashList<ImageType>, ImageCarouselProps>(function ImageCarousel(
    { images, width, height, ...rest },
    ref,
) {
    const keyExtractor = (_: ImageType, index: number) => index.toString();

    const renderItem = ({ item, index }: ListRenderItemInfo<ImageType>) => {
        const isFirstImage = index === 0;
        const priority = isFirstImage ? 'high' : 'low';
        const recyclingKey = item.src;
        const uri = item.src.replace(TEMP, '');
        const newUri = uri.startsWith('https') ? uri : TEMP + uri;

        return (
            <Image
                source={{ uri: newUri, width, height }}
                priority={priority}
                recyclingKey={recyclingKey}
                style={{ width, height }}
                contentFit="cover"
                placeholderContentFit="cover"
                placeholder={require('@/assets/images/default_image.png')}
            />
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