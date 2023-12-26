import { useBottomSheet } from '@crawl/bottom-sheet';
import { Typo } from '@crawl/design-system';
import { FlashList, type ContentStyle, type ListRenderItem } from '@shopify/flash-list';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useInfiniteFetchEntity from '../../hooks/queries/useInfiniteFetchEntity';

import { Avatar } from '@/components/@common/atoms';
import type { FetchEntityListResponse } from '@/types/apis/diary/entity';

interface SelectEntityActions {
    onSelectEntity(entity: FetchEntityListResponse['entity']): void;
}

export type SelectEntityProps = SelectEntityActions;

export default function SelectEntityBottomSheet({ onSelectEntity }: SelectEntityProps) {
    const { data } = useInfiniteFetchEntity();
    const { bottomSheetClose } = useBottomSheet();

    const renderItem: ListRenderItem<FetchEntityListResponse> = useCallback(
        ({ item }) => {
            const handlePressEntity = () => {
                onSelectEntity(item.entity);
                bottomSheetClose();
            };

            return (
                <TouchableOpacity onPress={handlePressEntity}>
                    <View style={styles.itemWrapper}>
                        <Avatar image={item.entity.image} size={80} />
                        <View style={styles.textWrapper}>
                            <Typo>{item.entity.name}</Typo>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        },
        [bottomSheetClose, onSelectEntity],
    );

    return (
        <View style={styles.wrapper}>
            <FlashList
                data={data}
                renderItem={renderItem}
                contentContainerStyle={contentContainerStyle}
                estimatedItemSize={90}
            />
        </View>
    );
}

const contentContainerStyle: ContentStyle = {
    padding: 20,
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        minHeight: 2,
    },
    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginBottom: 10,
    },
    textWrapper: {
        flex: 1,
    },
});
