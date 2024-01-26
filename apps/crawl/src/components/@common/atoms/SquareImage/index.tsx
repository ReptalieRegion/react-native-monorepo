import { Image } from 'expo-image';
import React from 'react';

import type { ImageType } from '@/types/global/image';

type SquareImageProps = {
    image: ImageType;
    size: number;
};

export default function SquareImage({ image, size }: SquareImageProps) {
    return (
        <Image
            style={{ width: size, height: size }}
            recyclingKey={image.src}
            source={{ uri: image?.src }}
            priority="high"
            contentFit="cover"
            placeholder={require('@/assets/images/default_image.png')}
            placeholderContentFit="cover"
        />
    );
}