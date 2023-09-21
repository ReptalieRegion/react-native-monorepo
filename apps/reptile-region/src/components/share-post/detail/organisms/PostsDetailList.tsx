import { ContentStyle, FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import React, { useCallback, useMemo } from 'react';
import { Platform, StyleSheet, View, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ListFooterLoading from '../../../common/loading/ListFooterComponent';
import SquareImage from '../atoms/SquareImage';

import { SharePostListUserDetailData } from '<SharePostAPI>';
import useInfiniteUserPosts from '@/apis/share-post/post/hooks/queries/useInfiniteUserPosts';

type SharePostDetailProps = {
    nickname: string;
    handleImagePress: () => void;
};

const NUM_COLUMNS = 3;
const DefaultPaddingBottom = 10;

const SharePostsDetailList = ({ nickname, handleImagePress }: SharePostDetailProps) => {
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

    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<SharePostListUserDetailData>) => {
            return (
                <TouchableOpacity onPress={handleImagePress}>
                    <SquareImage images={item.post.images} width={itemWidth} />
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
                keyExtractor={(item, index) => item.post.images[0].src + index}
                renderItem={renderItem}
                numColumns={NUM_COLUMNS}
                estimatedItemSize={itemWidth}
                ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
                onEndReached={onEndReached}
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
