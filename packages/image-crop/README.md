# `image-crop`

인스타그램처럼 zoom으로 이미지를 Crop할 수 있는 패키지입니다.

## Preview
![Simulator Screen Recording - iPhone 15 - 2024-02-01 at 11 32 48](https://github.com/ReptalieRegion/react-native-monorepo/assets/96051437/26203868-7166-4a30-b775-14e9bfbffbdc)


## Installation

```
yarn workspace <설치할 패키지 이름> add @crawl/image-crop
```

### Dependencies

```
yarn workspace <설치할 패키지 이름> add @react-native-community/image-editor react-native-gesture-handler react-native-reanimated
```

## Usage

```tsx
import { ImageZoom, cropImage, type CropInfo } from '@crawl/image-crop';
import { useCameraRoll } from '@react-native-camera-roll/camera-roll';
import { Image } from 'expo-image';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ConditionRender from '../../components/ConditionRender';

export default function ImageCrop() {
    const [cropInfo, setCropInfo] = useState<CropInfo & { uri: string }>();
    const [croppedImage, setCroppedImage] = useState<string>();

    const handleSetCropInfo = (uri: string, props: CropInfo) => {
        setCropInfo({ uri, ...props });
    };

    const handleCropImage = async () => {
        if (cropInfo) {
            const imageUri = await cropImage(cropInfo.uri, {
                offset: cropInfo?.offset,
                size: cropInfo?.size,
            });

            setCroppedImage(imageUri);
        }
    };

    return (
        <>
            <ImageZoom
                uri={이미지_uri}
                minScale={0.6}
                maxScale={3}
                minPanPointers={1}
                containerStyle={{
                    width: 이미지컨테이너_width,
                    height: 이미지컨테이너_height,
                }}
                initial={cropInfo?.translation}
                imageStyle={{
                    width: 이미지_width,
                    height: 이미지_height,
                }}
                onInteractionEnd={handleSetCropInfo}
            />
            <Button title="이미지 크롭" onPress={handleCropImage} />
            <Image style={imageSize} source={{ uri: croppedImage }} />
        </>
    );
}
```
