import { TouchableTypo } from 'design-system';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Follow from '../../atoms/Follow';

import { ImageType } from '<image>';
import { KebabMenu } from '@/assets/icons';
import { Avatar, ConditionalRenderer } from '@/components/@common/atoms';

type PostHeaderState = {
    profileImage: ImageType;
    nickname: string;
    showFollowButton: boolean;
    isFollow: boolean | undefined;
};

interface PostHeaderActions {
    onPressFollow(): void;
    onPressProfile(): void;
    onPressPostOptionsMenu(): void;
}

type PostHeaderProps = PostHeaderState & PostHeaderActions;

export default function PostHeader({
    isFollow,
    nickname,
    profileImage,
    showFollowButton = true,
    onPressFollow,
    onPressPostOptionsMenu,
    onPressProfile,
}: PostHeaderProps) {
    return (
        <View style={styles.container}>
            <View style={styles.leftItemContainer}>
                <Avatar image={{ src: profileImage.src }} size={30} priority={'high'} onPress={onPressProfile} />
                <TouchableTypo onPress={onPressProfile} variant="title5">
                    {nickname}
                </TouchableTypo>
            </View>
            <View style={styles.rightItemContainer}>
                <ConditionalRenderer
                    condition={showFollowButton}
                    trueContent={<Follow isFollow={isFollow} onPress={onPressFollow} />}
                    falseContent={null}
                />
                <TouchableOpacity onPress={onPressPostOptionsMenu}>
                    <KebabMenu />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    leftItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    rightItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
