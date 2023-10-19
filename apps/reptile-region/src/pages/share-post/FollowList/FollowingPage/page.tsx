import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { Typo, color } from '@reptile-region/design-system';
import { FlashList, type ContentStyle, type ListRenderItem } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { FetchFollowerListResponse } from '<api/share/post/user>';
import type { SharePostTopTabParamList } from '<routes/top-tab>';
import useInfiniteFollowingList from '@/apis/share-post/user/hooks/queries/useInfiniteFollowingList';
import { Avatar } from '@/components/@common/atoms';
import Follow from '@/components/share-post/atoms/Follow';

type FollowerPageScreenProps = MaterialTopTabScreenProps<SharePostTopTabParamList, 'share-post/following/list'>;

export default function FollowingPage({ route: { params } }: FollowerPageScreenProps) {
    const { data } = useInfiniteFollowingList({ userId: params.userId });

    const newData = data?.pages.flatMap((page) => page.items);

    const keyExtractor = (item: FetchFollowerListResponse) => item.user.id;

    const renderItem: ListRenderItem<FetchFollowerListResponse> = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.testContainer}>
                    <Avatar image={item.user.profile} size={35} />
                    <Typo variant="body3">{item.user.nickname}</Typo>
                </View>
                <Follow isFollow={item.user.isFollow} onPress={() => {}} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlashList
                data={newData}
                contentContainerStyle={contentContainerStyle}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                estimatedItemSize={55}
            />
        </View>
    );
}

const contentContainerStyle: ContentStyle = {
    padding: 15,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    testContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
});
