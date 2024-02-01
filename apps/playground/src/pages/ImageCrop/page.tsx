import { ImageZoom, cropImage, type CropInfo } from '@crawl/image-crop';
import { useCameraRoll } from '@react-native-camera-roll/camera-roll';
import { Image } from 'expo-image';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ConditionRender from '../../components/ConditionRender';

export default function ImageCrop() {
    const [photos, fetchPhoto] = useCameraRoll();

    const [cropInfo, setCropInfo] = useState<CropInfo & { uri: string }>();
    const [croppedImage, setCroppedImage] = useState<string>();

    const { top } = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const imageSize = useMemo(() => ({ width, height: 300 }), [width]);
    const image = photos.edges[1]?.node?.image;

    useEffect(() => {
        fetchPhoto({ first: 10 });
    }, [fetchPhoto]);

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
            <ConditionRender
                condition={!!image?.uri}
                trueContent={
                    <View style={{ paddingTop: top }}>
                        <ImageZoom
                            uri={image?.uri}
                            minScale={0.6}
                            maxScale={3}
                            minPanPointers={1}
                            containerStyle={imageSize}
                            initial={cropInfo?.translation}
                            imageStyle={{
                                width: image?.width,
                                height: image?.height,
                            }}
                            onInteractionEnd={handleSetCropInfo}
                        />
                        <Button title="이미지 크롭" onPress={handleCropImage} />
                    </View>
                }
            />
            <Image style={imageSize} source={{ uri: croppedImage }} />
        </>
    );
}
