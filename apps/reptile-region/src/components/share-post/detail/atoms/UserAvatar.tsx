import { Typo } from 'design-system';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { ImageType } from '<image>';

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
                <Image
                    style={styles.image}
                    source={{
                        uri: profile.src.replace('https://reptalie-region.s3.ap-northeast-2.amazonaws.com/', ''),
                    }}
                    priority="high"
                    contentFit="cover"
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
