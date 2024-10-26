import { TouchableTypo } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Follow from '../Follow';

import { KebabMenu } from '@/assets/icons';
import { Avatar, ConditionalRenderer } from '@/components/@common/atoms';
import type { ImageType } from '@/types/global/image';

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

export default function PostCardHeader({
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
                <TouchableTypo onPress={onPressProfile} variant="title4">
                    {nickname}
                </TouchableTypo>
            </View>
            <View style={styles.rightItemContainer}>
                <View style={styles.paddingBottom}>
                    <ConditionalRenderer
                        condition={showFollowButton}
                        trueContent={<Follow isFollow={isFollow} onPress={onPressFollow} />}
                        falseContent={null}
                    />
                </View>
                <TouchableOpacity onPress={onPressPostOptionsMenu} style={styles.paddingBottom}>
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
    },
    leftItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingBottom: 10,
    },
    rightItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paddingBottom: {
        paddingBottom: 10,
    },
    optionMenuPadding: {
        paddingBottom: 10,
    },
});
