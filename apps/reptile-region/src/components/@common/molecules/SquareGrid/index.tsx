import { FlashList } from '@shopify/flash-list';
import type { ContentStyle, FlashListProps, ListRenderItemInfo } from '@shopify/flash-list';
import React, { useCallback } from 'react';
import { Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SquareImage from '../../atoms/SquareImage';

import type { ImageType } from '<image>';

type SquareGridProps = {
    data: ImageType[] | undefined;
    size: number;
    activeOpacity?: number;
} & Omit<FlashListProps<ImageType>, 'keyExtractor' | 'estimatedItemSize' | 'renderItem'>;

interface SquareGridActions {
    ImageItemOverlay?: (props: { image: ImageType }) => React.JSX.Element;
    onPressImage?({ index, src }: { index: number; src: string }): void;
}

const DEFAULT_PADDING_BOTTOM = 10;

export default function SquareGrid({
    data,
    size,
    activeOpacity = 0.5,
    onPressImage,
    ...flashListProps
}: SquareGridProps & SquareGridActions) {
    const { bottom } = useSafeAreaInsets();
    const contentContainerStyle: ContentStyle = {
        paddingBottom: Platform.select({
            ios: bottom + DEFAULT_PADDING_BOTTOM,
            android: DEFAULT_PADDING_BOTTOM,
            default: DEFAULT_PADDING_BOTTOM,
        }),
    };

    const keyExtractor = useCallback((item: ImageType) => item.src, []);

    const renderItem = useCallback(
        ({ item, index }: ListRenderItemInfo<ImageType>) => {
            const handlePress = () => {
                onPressImage?.({ index, src: item.src });
            };

            return (
                <TouchableOpacity onPress={handlePress} activeOpacity={activeOpacity}>
                    <SquareImage image={item} size={size} />
                </TouchableOpacity>
            );
        },
        [activeOpacity, size, onPressImage],
    );

    return (
        <FlashList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            contentContainerStyle={contentContainerStyle}
            estimatedItemSize={size}
            {...flashListProps}
        />
    );
}
