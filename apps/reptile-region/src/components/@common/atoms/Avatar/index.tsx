import { Image, ImageProps } from 'expo-image';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

type AvatarProps = Omit<ImageProps, 'style'> & {
    size?: number;
    onPress?: () => void;
};

export default function Avatar({ size = 30, onPress, ...rest }: AvatarProps) {
    const sizeStyle = { width: size, height: size, borderRadius: 9999 };

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.3}>
            <Image
                style={sizeStyle}
                contentFit="cover"
                placeholderContentFit="cover"
                placeholder={require('@/assets/images/avatar.png')}
                {...rest}
            />
        </TouchableOpacity>
    );
}
