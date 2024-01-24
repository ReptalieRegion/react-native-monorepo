import { Typo } from '@crawl/design-system';
import type { ListRenderItemInfo } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import React, { Suspense, useCallback, useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useTagHandler from '../../hooks/useTagHandler';
import useTagSearch from '../../hooks/useTagSearch';

import FollowerUserListSkeleton from './Loading';

import useInfiniteSearchFollowerUser from '@/apis/share-post/user/hooks/queries/useInfiniteSearchFollowerUser';
import { Avatar, ConditionalRenderer, ListFooterLoading } from '@/components/@common/atoms';
import type { FetchFollowerSearchResponse } from '@/types/apis/share-post/user';

type FollowerUserListProps = {
    containerStyles?: ViewStyle;
};

export default function FollowerUserList(props: FollowerUserListProps) {
    const { keyword, enabled } = useTagSearch();

    return (
        <ConditionalRenderer
            condition={enabled}
            trueContent={
                <Suspense fallback={<FollowerUserListSkeleton />}>
                    <FollowerUserListInner {...props} keyword={keyword} />
                </Suspense>
            }
        />
    );
}

function FollowerUserListInner({ keyword, containerStyles }: FollowerUserListProps & { keyword: string }) {
    const { handleSelectTag } = useTagHandler();

    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteSearchFollowerUser({
        search: keyword.slice(1),
    });

    const keyExtractor = useCallback((item: FetchFollowerSearchResponse) => item.user.id, []);

    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<FetchFollowerSearchResponse>) => {
            const handlePressItem = () => {
                handleSelectTag(item.user.nickname);
            };

            return (
                <TouchableOpacity onPress={handlePressItem}>
                    <View style={styles.renderItem}>
                        <Avatar recyclingKey={item.user.profile.src} image={{ src: item.user.profile.src }} size={40} />
                        <Typo variant="title3">{item.user.nickname}</Typo>
                    </View>
                </TouchableOpacity>
            );
        },
        [handleSelectTag],
    );

    const handleEndReached = useCallback(
        () => hasNextPage && !isFetchingNextPage && fetchNextPage(),
        [fetchNextPage, hasNextPage, isFetchingNextPage],
    );

    const wrapperStyle = useMemo(() => [styles.container, containerStyles], [containerStyles]);

    return (
        <ConditionalRenderer
            condition={!!data && data?.length !== 0}
            trueContent={
                <View style={wrapperStyle}>
                    <FlashList
                        data={data}
                        keyExtractor={keyExtractor}
                        renderItem={renderItem}
                        ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
                        onEndReached={handleEndReached}
                        estimatedItemSize={30}
                    />
                </View>
            }
            falseContent={null}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
        gap: 10,
    },
    renderItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
        gap: 12,
    },
});
