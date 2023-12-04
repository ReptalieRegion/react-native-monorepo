import { color } from '@reptile-region/design-system';
import { FlashList, type ContentStyle } from '@shopify/flash-list';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useInfiniteFetchEntity from '@/apis/diary/entity-manager/hooks/queries/useInfiniteFetchEntity';
import { PostWriteIcon, UpArrow } from '@/assets/icons';
import { ListFooterLoading } from '@/components/@common/atoms';
import EntityCard from '@/components/diary/atoms/EntityCard/EntityCard';
import FloatingActionButtonGroup from '@/components/share-post/organisms/FloatingActionButtons/components/FloatingActionButtonGroup';
import useEntityMangerActions from '@/hooks/diary/actions/useEntityMangerActions';
import useEntityMangerNavigation from '@/hooks/diary/navigation/useEntityMangerNavigation';
import type { FetchEntityListResponse } from '@/types/apis/diary/entity';

export default function EntityMangerList() {
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteFetchEntity();
    const { flashListRef, handlePressUpFloatingButton, handleScroll } = useEntityMangerActions();
    const { navigateEntityCreatePage, navigateEntityUpdatePage } = useEntityMangerNavigation();

    const keyExtractor = (item: FetchEntityListResponse) => item.entity.id;

    const handleEndReached = () => isFetchingNextPage && hasNextPage && fetchNextPage();

    return (
        <View style={styles.container}>
            <FlashList
                ref={flashListRef}
                data={data}
                contentContainerStyle={contentStyle}
                renderItem={(props) => (
                    <TouchableOpacity
                        style={testStyle}
                        onPress={() => navigateEntityUpdatePage({ entityId: props.item.entity.id })}
                    >
                        <EntityCard {...props} />
                    </TouchableOpacity>
                )}
                numColumns={2}
                ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
                keyExtractor={keyExtractor}
                onEndReached={handleEndReached}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                estimatedItemSize={212}
            />
            <FloatingActionButtonGroup position={{ right: 70, bottom: 70 }}>
                <FloatingActionButtonGroup.Button
                    name="primary"
                    Icon={PostWriteIcon}
                    iconStyle={primaryIcon}
                    onPress={navigateEntityCreatePage}
                />
                <FloatingActionButtonGroup.Button
                    name="secondary"
                    Icon={UpArrow}
                    iconStyle={secondaryIcon}
                    onPress={handlePressUpFloatingButton}
                />
            </FloatingActionButtonGroup>
        </View>
    );
}

const testStyle = {
    flex: 1,
    backgroundColor: color.White.toString(),
    ...Platform.select({
        ios: {
            shadowColor: '#7090B0',
            shadowOpacity: 0.15,
            shadowRadius: 15,
            shadowOffset: {
                width: 0,
                height: 1,
            },
        },
        android: {
            elevation: 24,
        },
    }),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginRight: 5,
    marginBottom: 5,
};

const primaryIcon = {
    width: 50,
    height: 50,
    backgroundColor: color.Teal[150].toString(),
};

const secondaryIcon = {
    width: 50,
    height: 50,
    backgroundColor: color.White.toString(),
    borderColor: color.Gray[200].toString(),
    borderWidth: 1,
};

const contentStyle: ContentStyle = {
    paddingTop: 5,
    paddingHorizontal: 5,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
