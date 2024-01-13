import { Typo } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/@common/atoms';
import type { ImageType } from '@/types/global/image';

type ProfileState = {
    user:
        | {
              profile: ImageType;
              nickname: string;
          }
        | undefined;
};

type ProfileProps = ProfileState;

export default function Profile({ user }: ProfileProps) {
    if (!user) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Avatar recyclingKey={user.profile.src} image={user.profile} size={80} />
            <Typo variant="title2">{user.nickname}</Typo>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
});
