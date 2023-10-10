import { Image } from 'expo-image';
import React from 'react';

import type { ImageType } from '<image>';

type SquareImageProps = {
    image: ImageType;
    size: number;
};

const TEMP = 'https://reptalie-region.s3.ap-northeast-2.amazonaws.com/';

export default function SquareImage({ image, size }: SquareImageProps) {
    const uri = image.src.replace(TEMP, '');
    const newUri = uri.startsWith('https') || uri.startsWith('ph') || uri.startsWith('file') ? uri : TEMP + uri;

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
