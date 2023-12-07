import { color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { StrokeCamera } from '@/assets/icons';

interface ImagePickerIconActions {
    onPress?(): void;
}

type ImagePickerIconProps = ImagePickerIconActions;

export default function ImagePickerIcon({ onPress }: ImagePickerIconProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <StrokeCamera />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: color.Gray[500].toString(),
        borderRadius: 15,
    },
});
