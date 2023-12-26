import { Typo } from '@crawl/design-system';
import type { ListRenderItemInfo } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useTagHandler from '../../hooks/useTagHandler';
import useTagSearch from '../../hooks/useTagSearch';

import useInfiniteSearchFollowerUser from '@/apis/share-post/user/hooks/queries/useInfiniteSearchFollowerUser';
import { Avatar, ConditionalRenderer, ListFooterLoading } from '@/components/@common/atoms';
import type { FetchFollowerSearchResponse } from '@/types/apis/share-post/user';

type FollowerUserListConditionRenderState = {
    containerStyles?: ViewStyle;
};

type FollowerUserListState = {
    keyword: string;
} & FollowerUserListConditionRenderState;

export default function FollowerUserListConditionRender({ containerStyles }: FollowerUserListConditionRenderState) {
    const { keyword, enabled } = useTagSearch();

    return (
        <ConditionalRenderer
            condition={enabled}
            trueContent={<FollowerUserList keyword={keyword} containerStyles={containerStyles} />}
            falseContent={null}
        />
    );
}

function FollowerUserList({ keyword, containerStyles }: FollowerUserListState) {
    const { handleSelectTag } = useTagHandler();

    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteSearchFollowerUser({
        search: keyword,
    });
    data.pages.forEach(console.log);

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
            condition={!!newData && newData?.length !== 0}
            trueContent={
                <View style={containerStyles}>
                    <View style={styles.container}>
                        <FlashList
                            data={newData}
                            keyExtractor={keyExtractor}
                            renderItem={renderItem}
                            ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
                            onEndReached={onEndReached}
                            estimatedItemSize={30}
                        />
                    </View>
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
        marginBottom: 7,
        gap: 12,
    },
});
