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
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Button } from 'react-native';

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

## Props
```ts

type ImageZoomProps = Pick<ImageProps, 'onLayout' | 'source'> & {
    /**
     * 이미지 uri
     */
    uri?: string;
    /**
     * 이미지 크기 최소 비율
     */
    minScale?: number;
    /**
     * 이미지 크기 최대 비율
     */
    maxScale?: number;
    /**
     * 팬제스쳐 포인터 최소 개수
     */
    minPanPointers?: number;
    /**
     * 팬제스쳐 포인터 최대 개수
     */
    maxPanPointers?: number;
    /**
     * 팬 제스쳐 가능 여부
     */
    isPanEnabled?: boolean;
    /**
     * 핀치 제스처 가능 여부
     */
    isPinchEnabled?: boolean;
    /**
     * 제스처 시작했을 때 이벤트
     */
    onInteractionStart?(): void;
    /**
     * 제스처 끝났을 때 이벤트
     */
    onInteractionEnd?(uri: string, props: CropInfo): void;
    /**
     * 핀치 제스처 시작했을 때 이벤트
     */
    onPinchStart?(): void;
    /**
     * 핀치 제스처 끝났을 때 이벤트
     */
    onPinchEnd?(): void;
    /**
     * 팬 제스쳐 시작했을 때 이벤트
     */
    onPanStart?(): void;
    /**
     * 팬 제스쳐 끝났을 때 이벤트
     */
    onPanEnd?(): void;
    /**
     * 컨테이너 크기 스타일
     */
    containerStyle: {
        width: number;
        height: number;
    };
    /**
     * 이미지 크기 스타일
     */
    imageStyle: {
        width: number;
        height: number;
    };
    /**
     * 이미지 초기 위치 및 확대 비율
     */
    initial?: {
        x: number;
        y: number;
        focalX: number;
        focalY: number;
        scale: number;
    };
};
```
