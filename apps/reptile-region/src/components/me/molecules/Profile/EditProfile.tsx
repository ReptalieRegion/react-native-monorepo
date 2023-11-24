import { color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Camera } from '@/assets/icons';
import { Avatar } from '@/components/@common/atoms';
import type { ImageType } from '@/types/global/image';

type EditProfileState = {
    profile: ImageType | undefined;
};

interface EditProfileActions {
    onPress?(): void;
}

type EditProfileProps = EditProfileState & EditProfileActions;

export default function EditProfile({ profile, onPress }: EditProfileProps) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Avatar image={profile} size={100} />
                <View style={styles.iconContainer}>
                    <Camera width={24} height={24} />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    iconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: color.Teal[150].toString(),
        borderRadius: 9999,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
