import { Typo, color } from '@reptile-region/design-system';
import { FlashList, type ContentStyle, type ListRenderItem } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Avatar, ConditionalRenderer, FadeInCellRenderComponent } from '@/components/@common/atoms';
import Follow from '@/components/share-post/atoms/Follow';
import type { FetchFollowerListResponse } from '@/types/apis/share-post/user';
import type { ImageType } from '@/types/global/image';
import type { ImageThumbnailParams } from '@/types/routes/params/sharePost';

type User = {
    user: {
        id: string;
        profile: ImageType;
        nickname: string;
        isFollow: boolean | undefined;
        isMine: boolean;
    };
};

type UserProfileListState = {
    data: User[];
};

interface UserProfileListActions {
    onEndReached(): void;
    onPressFollow(props: { userId: string; isFollow: boolean | undefined }): void;
    onPressProfile(props: Omit<ImageThumbnailParams, 'pageState'>): void;
}

type UserProfileListProps = UserProfileListState & UserProfileListActions;

export default function UserProfileList({ data, onEndReached, onPressProfile, onPressFollow }: UserProfileListProps) {
    const keyExtractor = (item: FetchFollowerListResponse) => item.user.id;

    const renderItem: ListRenderItem<User> = ({
        item: {
            user: { id: userId, isFollow, nickname, profile, isMine },
        },
    }) => {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.profileWrapper}>
                    <TouchableOpacity
                        style={styles.profileContainer}
                        onPress={() => onPressProfile({ user: { isFollow, nickname, profile } })}
                    >
                        <Avatar image={profile} size={40} />
                        <Typo variant="body2">{nickname}</Typo>
                    </TouchableOpacity>
                </View>
                <ConditionalRenderer
                    condition={isMine}
                    trueContent={null}
                    falseContent={<Follow isFollow={isFollow} onPress={() => onPressFollow({ userId, isFollow })} />}
                />
            </View>
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
    profileWrapper: {
        flex: 1,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
});
