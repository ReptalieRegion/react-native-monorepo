import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { Typo } from 'design-system';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTagHandler, useTagSearch } from 'tag-text-input';

import type { FetchFollowerSearchResponse } from '<api/share/post/user>';
import useInfiniteSearchFollowerUser from '@/apis/share-post/user/hooks/queries/useInfiniteSearchFollowerUser';
import { Avatar, ConditionalRenderer, ListFooterLoading } from '@/components/@common/atoms';

const FollowerUserList = () => {
    const { keyword, enabled } = useTagSearch();
    const { handleSelectTag } = useTagHandler();

    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteSearchFollowerUser({
        search: keyword,
        enabled,
    });

    const newData = useMemo(() => data?.pages.flatMap((page) => page.items), [data?.pages]);
    const keyExtractor = useCallback((item: FetchFollowerSearchResponse) => item.user.id, []);
    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<FetchFollowerSearchResponse>) => {
            const handlePressItem = () => {
                handleSelectTag(item.user.nickname);
            };

            return (
                <TouchableOpacity onPress={handlePressItem}>
                    <View style={styles.renderItem}>
                        <Avatar recyclingKey={item.user.profile.src} image={{ src: item.user.profile.src }} size={30} />
                        <Typo variant="title5">{item.user.nickname}</Typo>
                    </View>
                </TouchableOpacity>
            );
        },
        [handleSelectTag],
    );
    const onEndReached = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    return (
        <ConditionalRenderer
            condition={enabled}
            trueContent={
                <View style={styles.container}>
                    <Typo variant="title5">팔로우한 사람</Typo>
                    <FlashList
                        data={newData}
                        keyExtractor={keyExtractor}
                        renderItem={renderItem}
                        ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
                        onEndReached={onEndReached}
                        estimatedItemSize={30}
                    />
                </View>
            }
            falseContent={null}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
        gap: 10,
    },
    renderItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 7,
        gap: 12,
    },
});

export default FollowerUserList;
