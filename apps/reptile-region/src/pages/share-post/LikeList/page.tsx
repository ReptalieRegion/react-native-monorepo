import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { Typo, color } from '@reptile-region/design-system';
import { FlashList, type ContentStyle, type ListRenderItem } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { FetchLikeResponse } from '<api/share/post>';
import type { SharePostTabParamList } from '<routes/bottom-tab>';
import useInfiniteFetchLikes from '@/apis/share-post/post/hooks/queries/useInfiniteFetchLikes';
import useCreateOrUpdateFollow from '@/apis/share-post/user/hooks/mutations/useCreateOrUpdateFollow';
import { Avatar } from '@/components/@common/atoms';
import Follow from '@/components/share-post/atoms/Follow';

type FollowerPageScreenProps = MaterialTopTabScreenProps<SharePostTabParamList, 'share-post/list/like'>;

export default function LikeListPage({ route: { params } }: FollowerPageScreenProps) {
    const { data } = useInfiniteFetchLikes({ postId: params.postId });
    const { mutateFollow } = useCreateOrUpdateFollow();

    const keyExtractor = (item: FetchLikeResponse) => item.user.id;

    const renderItem: ListRenderItem<FetchLikeResponse> = ({ item }) => {
        const handlePressFollow = () => {
            mutateFollow({ userId: item.user.id, isFollow: item.user.isFollow });
        };

        return (
            <View style={styles.itemContainer}>
                <View style={styles.testContainer}>
                    <Avatar image={item.user.profile} size={35} />
                    <Typo variant="body3">{item.user.nickname}</Typo>
                </View>
                <Follow isFollow={item.user.isFollow} onPress={handlePressFollow} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlashList
                data={data}
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
