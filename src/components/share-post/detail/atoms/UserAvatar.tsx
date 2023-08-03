import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { SharePostDetailPostsData } from '<SharePostAPI>';

type UserAvatarProps = Pick<SharePostDetailPostsData, 'profile' | 'nickname'>;

const UserAvatar = ({ profile, nickname }: UserAvatarProps) => {
    return (
        <>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: profile.src, width: 100, height: 100 }}
                    alt={profile.alt}
                    resizeMode="cover"
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
