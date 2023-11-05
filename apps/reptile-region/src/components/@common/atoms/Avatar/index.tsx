import type { ImageProps } from 'expo-image';
import { Image } from 'expo-image';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ConditionalRenderer from '../ConditionalRenderer';

import type { ImageType } from '<image>';
import { imageUriParsing } from '@/utils/development';

type AvatarProps = Omit<ImageProps, 'style' | 'source'> & {
    image: ImageType | undefined;
    size?: number;
    onPress?: () => void;
};

export default function Avatar({ size = 30, image, onPress, ...rest }: AvatarProps) {
    const newUri = imageUriParsing(image?.src ?? '');
    const sizeStyle = { width: size, height: size, borderRadius: 9999 };

    return (
        <ConditionalRenderer
            condition={!!onPress}
            trueContent={
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
            }
            falseContent={
                <Image
                    source={{ uri: newUri }}
                    style={sizeStyle}
                    contentFit="cover"
                    placeholderContentFit="cover"
                    placeholder={require('@/assets/images/avatar.png')}
                    {...rest}
                />
            }
        />
    );
}
