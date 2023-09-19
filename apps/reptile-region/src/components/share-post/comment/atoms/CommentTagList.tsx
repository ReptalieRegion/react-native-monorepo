import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { Typo } from 'design-system';
import React, { useCallback, useMemo } from 'react';
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';

import { SharePostSearchFollowerUserData } from '<SharePostUserAPI>';
import useInfiniteSearchFollowerUser from '@/apis/share-post/user/hooks/queries/useInfiniteSearchFollowerUser';
import Avatar from '@/components/common/fast-image/Avatar';
import ListFooterLoading from '@/components/common/loading/ListFooterComponent';
import useTagAction from '@/hooks/useTagAction';
import useTagState from '@/hooks/useTagState';

const CommentTagList = () => {
    const { keyword } = useTagState();
    const { handleSelectTag } = useTagAction();
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteSearchFollowerUser({
        search: keyword ?? '',
    });

    const newData = useMemo(() => data?.pages.flatMap((page) => page.items), [data?.pages]);
    const keyExtractor = useCallback((item: SharePostSearchFollowerUserData) => item.user.id, []);
    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<SharePostSearchFollowerUserData>) => {
            const handlePressTag = (event: GestureResponderEvent) => {
                event.preventDefault();
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
    const onEndReached = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    return (
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingTop: 10,
        minHeight: 2,
    },
    renderItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 12,
        gap: 10,
    },
});

export default CommentTagList;
