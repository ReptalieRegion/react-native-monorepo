import { Typo, color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { StrokeCamera } from '@/assets/icons';

type ImagePickerIconState = {
    maxSize: number;
    currentSize: number;
};

interface ImagePickerIconActions {
    onPress?(): void;
}

type ImagePickerIconProps = ImagePickerIconActions & ImagePickerIconState;

export default function ImagePickerIcon({ maxSize, currentSize, onPress }: ImagePickerIconProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <StrokeCamera stroke={color.DarkGray[500].toString()} />
            <Typo variant="body4" color="placeholder">
                <Typo variant="body4">{currentSize}</Typo> / {maxSize}
            </Typo>
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
        gap: 5,
    },
});
