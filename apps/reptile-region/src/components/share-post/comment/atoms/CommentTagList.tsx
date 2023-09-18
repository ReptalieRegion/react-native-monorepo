import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { SharePostSearchFollowerUserData } from '<SharePostUserAPI>';
import useInfiniteSearchFollowerUser from '@/apis/share-post/user/hooks/queries/useInfiniteSearchFollowerUser';
import Avatar from '@/components/common/fast-image/Avatar';
import ListFooterLoading from '@/components/common/loading/ListFooterComponent';
import useTag from '@/hooks/useTag';

const CommentTagList = () => {
    const { keyword, handleSelectTag } = useTag();
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteSearchFollowerUser({
        search: keyword ?? '',
    });

    const newData = useMemo(() => data?.pages.flatMap((page) => page.items), [data?.pages]);
    const keyExtractor = useCallback((item: SharePostSearchFollowerUserData) => item.user.id, []);
    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<SharePostSearchFollowerUserData>) => {
            return (
                <TouchableOpacity onPress={() => handleSelectTag(item.user.nickname)}>
                    <View style={styles.renderItem}>
                        <Avatar recyclingKey={item.user.profile.src} source={{ uri: item.user.profile.src }} size={30} />
                        <Text style={styles.semiBold}>{item.user.nickname}</Text>
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
                data={newData}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ListFooterComponent={ListFooterLoading}
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
    semiBold: {
        fontWeight: '600',
    },
    renderItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 12,
        gap: 10,
    },
});

export default CommentTagList;
