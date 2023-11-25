import { Typo, color } from '@reptile-region/design-system';
import { FlashList, type ContentStyle, type ListRenderItem } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useCreateOrUpdateFollow from '@/apis/share-post/user/hooks/combine/useCreateOrUpdateFollow';
import { Avatar, FadeInCellRenderComponent } from '@/components/@common/atoms';
import Follow from '@/components/share-post/atoms/Follow';
import type { FetchFollowerListResponse } from '@/types/apis/share-post/user';
import type { ImageType } from '@/types/global/image';

type User = {
    user: {
        id: string;
        profile: ImageType;
        nickname: string;
        isFollow: boolean | undefined;
    };
};

type UserProfileListState = {
    data: User[];
};

interface UserProfileListActions {
    onEndReached(): void;
    onPressProfile(): void;
}

type UserProfileListProps = UserProfileListState & UserProfileListActions;

export default function UserProfileList({ data, onEndReached, onPressProfile }: UserProfileListProps) {
    const { mutateFollow } = useCreateOrUpdateFollow();

    const keyExtractor = (item: FetchFollowerListResponse) => item.user.id;

    const renderItem: ListRenderItem<FetchFollowerListResponse> = ({ item }) => {
        const handlePressFollow = () => {
            mutateFollow({ userId: item.user.id, isFollow: item.user.isFollow });
        };

        return (
            <TouchableOpacity onPress={onPressProfile}>
                <View style={styles.itemContainer}>
                    <View style={styles.testContainer}>
                        <Avatar image={item.user.profile} size={35} />
                        <Typo variant="body3">{item.user.nickname}</Typo>
                    </View>
                    <Follow isFollow={item.user.isFollow} onPress={handlePressFollow} />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlashList
                data={data}
                contentContainerStyle={contentContainerStyle}
                CellRendererComponent={FadeInCellRenderComponent}
                onEndReached={onEndReached}
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
