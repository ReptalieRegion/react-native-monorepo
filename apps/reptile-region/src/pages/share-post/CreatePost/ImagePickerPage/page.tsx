import { PhotoList, useCameraAlbum } from '@crawl/camera-album';
import { Typo } from '@crawl/design-system';
import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { MAX_SELECT_COUNT } from '../@common/constants';

import CameraAlbumActions from './components/CameraAlbumActions';
import PhotoEditorView from './components/PhotoEditorView';

import useToast from '@/components/overlay/Toast/useToast';
import PageWrapper from '@/components/PageWrapper';
import withPageHeaderUpdate from '@/components/withPageHeaderUpdate';
import type { ImagePickScreenProp } from '@/types/routes/props/share-post/create-post';

const ImagePickerPage = withPageHeaderUpdate<ImagePickScreenProp>(
    () => {
        const openToast = useToast();

        const { width, height } = useWindowDimensions();
        const textHeight = 50;
        const photoEditorHeight = height / 2;
        const photoListHeight = height - photoEditorHeight;

        return (
            <PageWrapper>
                <View style={{ width, height: photoEditorHeight }}>
                    <PhotoEditorView size={{ width, height: photoEditorHeight - textHeight }} />
                    <CameraAlbumActions height={textHeight} />
                </View>
                <View style={{ height: photoListHeight }}>
                    <PhotoList
                        photoFetchOptions={{ first: 100 }}
                        maxSelectCount={MAX_SELECT_COUNT}
                        onMaxSelectCount={() => {
                            openToast({ contents: `이미지는 최대 ${MAX_SELECT_COUNT}입니다`, severity: 'warning' });
                        }}
                    />
                </View>
            </PageWrapper>
        );
    },
    ({ navigation }) => {
        const { selectedPhotos } = useCameraAlbum();

        useEffect(() => {
            const isValidate = selectedPhotos.length === 0;

            const headerRight = () => {
                const handlePress = () => {
                    navigation.navigate('write');
                };

                return (
                    <TouchableOpacity
                        onPress={handlePress}
                        style={style.wrapper}
                        containerStyle={style.container}
                        disabled={isValidate}
                    >
                        <Typo color={isValidate ? 'placeholder' : 'default'} disabled={isValidate}>
                            다음
                        </Typo>
                    </TouchableOpacity>
                );
            };

            navigation.setOptions({ headerRight });
        }, [navigation, selectedPhotos.length]);
        return null;
    },
);

// TODO: 터치 영역 넓히기 위해 임시 방편으로 막음 수정 필요
const style = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        marginRight: -20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});

export default ImagePickerPage;
