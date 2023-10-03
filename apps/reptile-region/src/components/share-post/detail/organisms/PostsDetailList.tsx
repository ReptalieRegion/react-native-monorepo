import { ContentStyle, FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import React, { useCallback, useMemo } from 'react';
import { Platform, StyleSheet, View, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SquareImage from '../atoms/SquareImage';

import type { FetchDetailUserPostResponse } from '<api/share/post>';
import useInfiniteUserPosts from '@/apis/share-post/post/hooks/queries/useInfiniteUserPosts';
import { ListFooterLoading } from '@/components/@common/atoms';

type SharePostDetailProps = {
    nickname: string;
    ListHeaderComponent: React.JSX.Element;
    handleImagePress: (index: number) => void;
};

const NUM_COLUMNS = 3;
const DefaultPaddingBottom = 10;

const SharePostsDetailList = ({ nickname, ListHeaderComponent, handleImagePress }: SharePostDetailProps) => {
    /** UI */
    const { bottom } = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const itemWidth = width / NUM_COLUMNS - 2;
    const contentContainerStyle: ContentStyle = {
        paddingBottom: Platform.select({
            ios: bottom + DefaultPaddingBottom,
            android: DefaultPaddingBottom,
            default: DefaultPaddingBottom,
        }),
    };
    /** UI */

    /** Data */
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteUserPosts({ nickname });
    const newData = useMemo(() => data?.pages.flatMap((page) => page.items), [data?.pages]);

    const keyExtractor = useCallback((item: FetchDetailUserPostResponse) => item.post.images[0].src, []);

    const renderItem = useCallback(
        ({ item, index }: ListRenderItemInfo<FetchDetailUserPostResponse>) => {
            return (
                <TouchableOpacity onPress={() => handleImagePress(index)}>
                    <SquareImage post={{ images: item.post.images }} width={itemWidth} />
                </TouchableOpacity>
            );
        },
        [handleImagePress, itemWidth],
    );

    const onEndReached = useCallback(
        () => hasNextPage && !isFetchingNextPage && fetchNextPage(),
        [fetchNextPage, hasNextPage, isFetchingNextPage],
    );
    /** Data */

    return (
        <View style={styles.container}>
            <FlashList
                contentContainerStyle={contentContainerStyle}
                data={newData}
                keyExtractor={keyExtractor}
                ListHeaderComponent={ListHeaderComponent}
                renderItem={renderItem}
                numColumns={NUM_COLUMNS}
                estimatedItemSize={itemWidth}
                onEndReached={onEndReached}
                ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
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
