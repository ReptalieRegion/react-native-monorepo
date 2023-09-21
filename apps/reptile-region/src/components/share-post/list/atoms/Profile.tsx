import { TouchableTypo } from 'design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ShareImageType } from '<Image>';
import Avatar from '@/components/common/fast-image/Avatar';

type ProfileProps = {
    user: {
        profile: ShareImageType;
        nickname: string;
    };
    onPress: () => void;
};

export default function Profile({ user: { nickname, profile }, onPress }: ProfileProps) {
    return (
        <View style={styles.container}>
            <Avatar onPress={onPress} size={30} source={{ uri: profile.src }} priority="high" />
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
