import { Typo } from '@reptile-region/design-system';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import React from 'react';
import { View } from 'react-native';

import { FollowerPageScreenProps, contentContainerStyle, styles } from './page';

import type { FetchFollowerListResponse } from '<api/share/post/user>';
import useCreateOrUpdateFollow from '@/apis/share-post/user/hooks/mutations/useCreateOrUpdateFollow';
import useInfiniteFollowerList from '@/apis/share-post/user/hooks/queries/useInfiniteFollowerList';
import { Avatar } from '@/components/@common/atoms';
import Follow from '@/components/share-post/atoms/Follow';

export default function FollowerPage({ route: { params } }: FollowerPageScreenProps) {
    const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteFollowerList({ userId: params.userId });
    const { mutateFollow } = useCreateOrUpdateFollow();

    const keyExtractor = (item: FetchFollowerListResponse) => item.user.id;

    const renderItem: ListRenderItem<FetchFollowerListResponse> = ({ item }) => {
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

    const handleFetchNextPage = () => !isFetching && hasNextPage && fetchNextPage();

    return (
        <View style={styles.container}>
            <FlashList
                data={data}
                contentContainerStyle={contentContainerStyle}
                CellRendererComponent={FadeInCellRenderComponent}
                onEndReached={handleFetchNextPage}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                estimatedItemSize={55}
            />
        </View>
    );
}
