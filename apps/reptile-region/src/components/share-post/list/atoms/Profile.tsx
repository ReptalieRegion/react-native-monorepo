import { TouchableTypo } from 'design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { ImageType } from '<image>';
import Avatar from '@/components/common/fast-image/Avatar';

type ProfileProps = {
    user: {
        profile: ImageType;
        nickname: string;
    };
    onPress: () => void;
};

export default function Profile({ user: { nickname, profile }, onPress }: ProfileProps) {
    return (
        <View style={styles.container}>
            <Avatar
                onPress={onPress}
                size={30}
                source={{ uri: profile.src.replace('https://reptalie-region.s3.ap-northeast-2.amazonaws.com/', '') }}
                priority="high"
            />
            <TouchableTypo onPress={onPress} variant="title5">
                {nickname}
            </TouchableTypo>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 9999,
    },
});
