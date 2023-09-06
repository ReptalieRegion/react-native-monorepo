import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import React, { useCallback, useMemo } from 'react';
import { Platform, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ListFooterLoading from '../../../common/loading/ListFooterComponent';
import SquareImage from '../atoms/SquareImage';

import type { SharePostImagesData } from '<SharePostAPI>';
import useInfiniteUserPostImages from '@/apis/share-post/post/hooks/queries/useInfiniteUserPostImages';

type SharePostsDetailListProps = {
    userId?: string;
    nickname?: string;
};

const NUM_COLUMNS = 3;
const DefaultPaddingBottom = 10;

const SharePostsDetailList = ({ userId, nickname }: SharePostsDetailListProps) => {
    const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteUserPostImages({ userId, nickname });
    const { bottom } = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const itemWidth = width / NUM_COLUMNS - 2;

    const newData = useMemo(() => data?.pages.flatMap((page) => page.items), [data?.pages]);
    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<SharePostImagesData>) => <SquareImage post={item.post} width={itemWidth} />,
        [itemWidth],
    );
    const ListFooterComponent = useCallback(() => <ListFooterLoading isLoading={isFetchingNextPage} />, [isFetchingNextPage]);
    const onEndReached = useCallback(
        () => hasNextPage && !isFetchingNextPage && fetchNextPage(),
        [fetchNextPage, hasNextPage, isFetchingNextPage],
    );

    if (isLoading || !data) {
        return null;
    }

    return (
        <View style={styles.container}>
            <FlashList
                contentContainerStyle={{
                    paddingBottom: Platform.OS === 'ios' ? bottom + DefaultPaddingBottom : DefaultPaddingBottom,
                }}
                data={newData}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.post.thumbnail.src + index}
                numColumns={NUM_COLUMNS}
                estimatedItemSize={itemWidth}
                onEndReached={onEndReached}
                ListFooterComponent={ListFooterComponent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default SharePostsDetailList;
