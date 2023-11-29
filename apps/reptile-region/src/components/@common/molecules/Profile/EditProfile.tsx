import { color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Camera } from '@/assets/icons';
import { Avatar } from '@/components/@common/atoms';
import type { ImageType } from '@/types/global/image';

type EditProfileState = {
    profile: ImageType | undefined;
    imageSize?: number;
    style?: Pick<ViewStyle, 'marginBottom'>;
};

interface EditProfileActions {
    onPress?(): void;
}

type EditProfileProps = EditProfileState & EditProfileActions;

export default function EditProfile({ profile, imageSize = 100, style, onPress }: EditProfileProps) {
    return (
        <View style={[styles.profileWrapper, StyleSheet.flatten(style)]}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                    <Avatar image={profile} size={imageSize} />
                    <View style={styles.iconContainer}>
                        <Camera width={24} height={24} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    profileWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
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
