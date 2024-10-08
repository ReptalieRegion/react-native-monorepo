import { color } from '@crawl/design-system';
import { FlashList, type ContentStyle, type ListRenderItem } from '@shopify/flash-list';
import React, { useCallback } from 'react';

import EntityEmpty from './components/EntityEmpty';
import useInfiniteFetchEntity from './hooks/queries/useInfiniteFetchEntity';

import { PostWriteIcon, UpArrow } from '@/assets/icons';
import { FadeInCellRenderComponent, ListFooterLoading } from '@/components/@common/atoms';
import FloatingActionButtonGroup from '@/components/@common/organisms/FloatingActionButtons/components/FloatingActionButtonGroup';
import PageWrapper from '@/components/PageWrapper';
import EntityCard from '@/pages/diary/entity-manager/ListPage/components/EntityCard';
import useEntityMangerActions from '@/pages/diary/entity-manager/ListPage/hooks/useEntityMangerActions';
import useEntityMangerNavigation from '@/pages/diary/entity-manager/ListPage/hooks/useEntityMangerNavigation';
import type { FetchEntityListResponse } from '@/types/apis/diary/entity';

export default function EntityMangerList() {
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteFetchEntity();
    const { flashListRef, handlePressUpFloatingButton, handleScroll } = useEntityMangerActions();
    const { navigateEntityCreatePage, navigateEntityUpdatePage } = useEntityMangerNavigation();

    const renderItem: ListRenderItem<FetchEntityListResponse> = useCallback(
        (props) => {
            return (
                <EntityCard
                    data={props.item}
                    containerStyles={cardContainerStyles}
                    onPress={() => navigateEntityUpdatePage({ entityId: props.item.entity.id })}
                />
            );
        },
        [navigateEntityUpdatePage],
    );

    const keyExtractor = (item: FetchEntityListResponse) => item.entity.id;

    const handleEndReached = () => isFetchingNextPage && hasNextPage && fetchNextPage();

    return (
        <PageWrapper>
            <FlashList
                ref={flashListRef}
                data={data}
                contentContainerStyle={contentStyle}
                renderItem={renderItem}
                numColumns={2}
                ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
                keyExtractor={keyExtractor}
                onEndReached={handleEndReached}
                ListEmptyComponent={EntityEmpty}
                CellRendererComponent={FadeInCellRenderComponent}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                estimatedItemSize={212}
                showsVerticalScrollIndicator={false}
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
        </PageWrapper>
    );
}

const cardContainerStyles = {
    marginRight: 5,
    marginBottom: 8,
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
    paddingVertical: 5,
    paddingHorizontal: 5,
};
