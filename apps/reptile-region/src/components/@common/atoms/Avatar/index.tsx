import { Image, ImageProps } from 'expo-image';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { ImageType } from '<image>';

type AvatarProps = Omit<ImageProps, 'style' | 'source'> & {
    image: ImageType;
    size?: number;
    onPress?: () => void;
};

const TEMP = 'https://reptalie-region.s3.ap-northeast-2.amazonaws.com/';

export default function Avatar({ size = 30, image, onPress, ...rest }: AvatarProps) {
    const uri = image.src.replace(TEMP, '');
    const newUri = uri.startsWith('https') ? uri : TEMP + uri;
    const sizeStyle = { width: size, height: size, borderRadius: 9999 };

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.3}>
            <Image
                source={{ uri: newUri }}
                style={sizeStyle}
                contentFit="cover"
                placeholderContentFit="cover"
                placeholder={require('@/assets/images/avatar.png')}
                {...rest}
            />
        </TouchableOpacity>
    );
}
