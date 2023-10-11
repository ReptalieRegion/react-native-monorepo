import { Image } from 'expo-image';
import React from 'react';

import type { ImageType } from '<image>';
import { imageUriParsing } from '@/utils/development';

type SquareImageProps = {
    image: ImageType;
    size: number;
};

export default function SquareImage({ image, size }: SquareImageProps) {
    const newUri = imageUriParsing(image.src);

    return (
        <Image
            style={{ width: size, height: size }}
            recyclingKey={image.src}
            source={{ uri: newUri }}
            priority="high"
            contentFit="cover"
            placeholder={require('@/assets/images/default_image.png')}
            placeholderContentFit="cover"
        />
    );
}
