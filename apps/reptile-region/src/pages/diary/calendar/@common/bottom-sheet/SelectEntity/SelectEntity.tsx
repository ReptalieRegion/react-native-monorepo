import { BottomSheet } from '@crawl/bottom-sheet';
import { Typo, color } from '@crawl/design-system';
import { FlashList, type ContentStyle, type ListRenderItem } from '@shopify/flash-list';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useInfiniteFetchEntity from '../../hooks/queries/useInfiniteFetchEntity';

import { Avatar, ConditionalRenderer } from '@/components/@common/atoms';
import type { FetchEntityListResponse } from '@/types/apis/diary/entity';

type SelectEntityState = {
    isOpen: boolean;
};

interface SelectEntityActions {
    onClose(): void;
    onSelectEntity(entity: FetchEntityListResponse['entity']): void;
}

export type SelectEntityProps = SelectEntityState & SelectEntityActions;

export default function SelectEntityBottomSheet({ isOpen, onClose, onSelectEntity }: SelectEntityProps) {
    const { data } = useInfiniteFetchEntity();

    const renderItem: ListRenderItem<FetchEntityListResponse> = useCallback(
        ({ item }) => {
            const handlePressEntity = () => {
                onSelectEntity(item.entity);
                onClose();
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
        [onClose, onSelectEntity],
    );

    return (
        <ConditionalRenderer
            condition={isOpen}
            trueContent={
                <BottomSheet onClose={onClose} snapInfo={{ pointsFromTop: ['70%'], startIndex: 0 }} header={BottomSheetHeader}>
                    <View style={styles.wrapper}>
                        <FlashList
                            data={data}
                            renderItem={renderItem}
                            contentContainerStyle={contentContainerStyle}
                            estimatedItemSize={90}
                        />
                    </View>
                </BottomSheet>
            }
        />
    );
}

function BottomSheetHeader() {
    return (
        <View style={headerStyles.container}>
            <Typo variant="title3">개체선택</Typo>
        </View>
    );
}

const headerStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        borderBottomWidth: 0.5,
        padding: 10,
        width: '100%',
        borderBottomColor: color.Gray[250].toString(),
    },
});

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
