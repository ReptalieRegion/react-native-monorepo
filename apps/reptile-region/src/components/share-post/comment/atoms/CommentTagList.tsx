import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { Typo } from 'design-system';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTagHandler, useTagSearch } from 'tag-text-input';

import type { FetchFollowerSearchResponse } from '<api/share/post/user>';
import useInfiniteSearchFollowerUser from '@/apis/share-post/user/hooks/queries/useInfiniteSearchFollowerUser';
import { ConditionalRenderer, ListFooterLoading } from '@/components/@common/atoms';
import { Avatar } from '@/components/@common/atoms';

const CommentTagList = () => {
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
            const handlePressTag = () => {
                handleSelectTag(item.user.nickname);
            };

            return (
                <TouchableOpacity onPress={handlePressTag}>
                    <View style={styles.renderItem}>
                        <Avatar recyclingKey={item.user.profile.src} source={{ uri: item.user.profile.src }} size={30} />
                        <Typo variant="title5">{item.user.nickname}</Typo>
                    </View>
                </TouchableOpacity>
            );
        },
        [handleSelectTag],
    );
    const onEndReached = useCallback(
        () => hasNextPage && !isFetchingNextPage && fetchNextPage(),
        [fetchNextPage, hasNextPage, isFetchingNextPage],
    );

    return (
        <ConditionalRenderer
            condition={enabled}
            trueContent={
                <View style={styles.container}>
                    <FlashList
                        keyboardShouldPersistTaps="handled"
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
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        paddingLeft: 20,
        paddingTop: 10,
        backgroundColor: 'white',
    },
    renderItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 12,
        gap: 10,
    },
});

export default CommentTagList;
