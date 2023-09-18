import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { shallow } from 'zustand/shallow';

import { SharePostSearchFollowerUserData } from '<SharePostUserAPI>';
import useInfiniteSearchFollowerUser from '@/apis/share-post/user/hooks/queries/useInfiniteSearchFollowerUser';
import Avatar from '@/components/common/fast-image/Avatar';
import ListFooterLoading from '@/components/common/loading/ListFooterComponent';
import useUserTaggingStore from '@/stores/share-post/useUserTaggingStore';

const FollowerUserList = () => {
    const { taggingInfo, contents, selectTag } = useUserTaggingStore(
        (state) => ({
            contents: state.contentsInfo.contents,
            taggingInfo: state.taggingInfo,
            selectTag: state.selectTag,
        }),
        shallow,
    );

    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteSearchFollowerUser({
        search: taggingInfo.keyword ?? '',
    });

    const newData = useMemo(() => data?.pages.flatMap((page) => page.items), [data?.pages]);
    const keyExtractor = useCallback((item: SharePostSearchFollowerUserData) => item.user.id, []);
    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<SharePostSearchFollowerUserData>) => {
            const handlePressItem = () => {
                if (taggingInfo.selection === null) {
                    return;
                }

                const newContents =
                    contents.slice(0, taggingInfo.selection.start) +
                    item.user.nickname +
                    contents.slice(taggingInfo.selection.end, contents.length);
                selectTag(newContents);
                return;
            };

            return (
                <TouchableOpacity onPress={handlePressItem}>
                    <View style={styles.renderItem}>
                        <Avatar recyclingKey={item.user.profile.src} source={{ uri: item.user.profile.src }} size={30} />
                        <Text style={styles.semiBold}>{item.user.nickname}</Text>
                    </View>
                </TouchableOpacity>
            );
        },
        [taggingInfo.selection, contents, selectTag],
    );
    const onEndReached = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (taggingInfo.keyword === undefined) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.semiBold]}>팔로우한 사람</Text>
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
        marginBottom: 20,
    },
    text: {
        paddingBottom: 10,
    },
    semiBold: {
        fontWeight: '600',
    },
    renderItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 7,
        gap: 10,
    },
});

export default FollowerUserList;
