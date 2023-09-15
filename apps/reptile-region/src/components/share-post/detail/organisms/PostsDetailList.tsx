import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import React, { useCallback, useMemo } from 'react';
import { Platform, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ListFooterLoading from '../../../common/loading/ListFooterComponent';
import SquareImage from '../atoms/SquareImage';

import { SharePostListUserDetailData } from '<SharePostAPI>';
import useInfiniteUserPosts from '@/apis/share-post/post/hooks/queries/useInfiniteUserPosts';

type SharePostsDetailListProps = {
    nickname: string;
};

const NUM_COLUMNS = 3;
const DefaultPaddingBottom = 10;

const SharePostsDetailList = ({ nickname }: SharePostsDetailListProps) => {
    const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteUserPosts({ nickname });
    const { bottom } = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const itemWidth = width / NUM_COLUMNS - 2;

    const newData = useMemo(() => data?.pages.flatMap((page) => page.items), [data?.pages]);
    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<SharePostListUserDetailData>) => (
            <SquareImage images={item.post.images} width={itemWidth} />
        ),
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
                keyExtractor={(item, index) => item.post.images[0].src + index}
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
