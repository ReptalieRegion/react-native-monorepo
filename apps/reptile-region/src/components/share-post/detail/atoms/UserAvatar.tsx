import { Typo } from 'design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { ImageType } from '<image>';
import { Avatar } from '@/components/@common/atoms';

type UserAvatarProps = {
    user: {
        nickname: string;
        profile: ImageType;
    };
};

const UserAvatar = ({ user: { profile, nickname } }: UserAvatarProps) => {
    return (
        <>
            <View style={styles.imageContainer}>
                <Avatar
                    size={80}
                    source={{
                        uri: profile.src.replace('https://reptalie-region.s3.ap-northeast-2.amazonaws.com/', ''),
                    }}
                    priority="high"
                />
            </View>
            <Typo variant="title5">{nickname}</Typo>
        </>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        position: 'relative',
    },
    image: {
        borderRadius: 9999,
        width: 80,
        height: 80,
    },
    nickname: {
        fontWeight: '500',
    },
});

export default UserAvatar;
