import { color } from '@reptile-region/design-system';
import { FlashList, type ContentStyle } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useInfiniteFetchEntity from '@/apis/diary/entity-manager/hooks/queries/useInfiniteFetchEntity';
import { PostWriteIcon, UpArrow } from '@/assets/icons';
import { ListFooterLoading } from '@/components/@common/atoms';
import EntityCard from '@/components/diary/atoms/EntityCard1/EntityCard';
import FloatingActionButtonGroup from '@/components/share-post/organisms/FloatingActionButtons/components/FloatingActionButtonGroup';
import FloatingActionButtons from '@/components/share-post/organisms/FloatingActionButtons/providers/FloatingActionButtons';
import useEntityMangerActions from '@/hooks/diary/actions/useEntityMangerActions';
import useEntityMangerNavigation from '@/hooks/diary/navigation/useEntityMangerNavigation';
import type { FetchEntityListResponse } from '@/types/apis/diary/entity';

export default function EntityMangerList1() {
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteFetchEntity();
    const { flashListRef, handlePressUpFloatingButton, handleScroll } = useEntityMangerActions();
    const { navigateEntityCreatePage1, navigateEntityUpdatePage } = useEntityMangerNavigation();

    const keyExtractor = (item: FetchEntityListResponse) => item.entity.id;

    const handleEndReached = () => isFetchingNextPage && hasNextPage && fetchNextPage();

    return (
        <FloatingActionButtons>
            <View style={styles.container}>
                <FlashList
                    ref={flashListRef}
                    data={data}
                    contentContainerStyle={contentStyle}
                    renderItem={(props) => (
                        <TouchableOpacity onPress={() => navigateEntityUpdatePage({ entityId: props.item.entity.id })}>
                            <EntityCard {...props} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={keyExtractor}
                    onEndReached={handleEndReached}
                    onScroll={handleScroll}
                    ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
                    scrollEventThrottle={16}
                    estimatedItemSize={212}
                />
                <FloatingActionButtonGroup position={{ right: 70, bottom: 70 }}>
                    <FloatingActionButtonGroup.Button
                        name="primary"
                        Icon={PostWriteIcon}
                        iconStyle={primaryIcon}
                        onPress={navigateEntityCreatePage1}
                    />
                    <FloatingActionButtonGroup.Button
                        name="secondary"
                        Icon={UpArrow}
                        iconStyle={secondaryIcon}
                        onPress={handlePressUpFloatingButton}
                    />
                </FloatingActionButtonGroup>
            </View>
        </FloatingActionButtons>
    );
}

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
    paddingTop: 20,
    paddingHorizontal: 20,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
