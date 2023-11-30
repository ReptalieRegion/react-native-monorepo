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
    cameraSize?: number;
    style?: Pick<ViewStyle, 'marginBottom'>;
};

interface EditProfileActions {
    onPress?(): void;
}

type EditProfileProps = EditProfileState & EditProfileActions;

export default function EditProfile({ profile, imageSize = 100, cameraSize = 24, style, onPress }: EditProfileProps) {
    return (
        <View style={[styles.profileWrapper, StyleSheet.flatten(style)]}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                    <Avatar image={profile} size={imageSize} />
                    <View style={[styles.iconContainer, { width: cameraSize * 1.5, height: cameraSize * 1.5 }]}>
                        <Camera width={cameraSize} height={cameraSize} />
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
        justifyContent: 'center',
        alignItems: 'center',
    },
});
