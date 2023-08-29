import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import type { SharePostUserData } from '<SharePostUserAPI>';

type UserAvatarProps = {
    user: Pick<SharePostUserData['user'], 'nickname' | 'profile'>;
};

const UserAvatar = ({ user: { profile, nickname } }: UserAvatarProps) => {
    return (
        <>
            <View style={styles.imageContainer}>
                <FastImage
                    style={styles.image}
                    source={{
                        uri: profile.src,
                        priority: FastImage.priority.normal,
                        cache: FastImage.cacheControl.web,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>
            <Text style={styles.nickname}>{nickname}</Text>
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
