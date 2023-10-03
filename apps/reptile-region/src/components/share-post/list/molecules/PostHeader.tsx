import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Follow from '../../common/atoms/Follow';
import Profile from '../atoms/Profile';

import type { ImageType } from '<image>';
import { KebabMenu } from '@/assets/icons';
import { ConditionalRenderer } from '@/components/@common/atoms';

type PostHeaderProps = {
    user: {
        id: string;
        nickname: string;
        profile: ImageType;
        isFollow: boolean | undefined;
    };
    post: {
        isMine: boolean;
    };
    handleProfilePress: () => void;
    handleKebabMenuPress: () => void;
};

const PostHeader = ({
    user: { id: userId, isFollow, nickname, profile },
    post,
    handleProfilePress,
    handleKebabMenuPress,
}: PostHeaderProps) => {
    return (
        <View style={styles.container}>
            <Profile user={{ nickname, profile }} onPress={handleProfilePress} />
            <View style={styles.rightContent}>
                <ConditionalRenderer
                    condition={post.isMine}
                    trueContent={null}
                    falseContent={<Follow user={{ id: userId, isFollow }} />}
                />
                <TouchableOpacity onPress={handleKebabMenuPress}>
                    <KebabMenu />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default PostHeader;
