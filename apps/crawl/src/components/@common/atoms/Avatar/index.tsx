import type { ImageProps } from 'expo-image';
import { Image } from 'expo-image';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ConditionalRenderer from '../ConditionalRenderer';

import type { ImageType } from '@/types/global/image';

type AvatarProps = Omit<ImageProps, 'style' | 'source'> & {
    image: ImageType | undefined;
    size?: number;
    onPress?: () => void;
};

export default function Avatar({ size = 30, image, onPress, ...rest }: AvatarProps) {
    const sizeStyle = useMemo(() => [styles.image, { width: size, height: size }], [size]);

    return (
        <ConditionalRenderer
            condition={!!onPress}
            trueContent={
                <TouchableOpacity onPress={onPress} activeOpacity={0.3}>
                    <Image
                        source={{ uri: image?.src }}
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
                    source={{ uri: image?.src }}
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

const styles = StyleSheet.create({
    image: {
        borderRadius: 9999,
    },
});
