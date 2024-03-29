import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import CreateTemplate from '../@common/components/CreateTemplate';
import useCreateEntity from '../@common/context/CreateEntity/hooks/useCreateEntity';

import { StrokeCamera } from '@/assets/icons';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import useToast from '@/components/overlay/Toast/useToast';
import useImagePicker from '@/hooks/useImagePicker';
import EntityCard from '@/pages/diary/entity-manager/ListPage/components/EntityCard';
import type { EntityManagerCreateImageScreenProps } from '@/types/routes/props/diary/entity';

export default function EntityManagerImagePage({ navigation }: EntityManagerCreateImageScreenProps) {
    const openToast = useToast();
    const {
        entityDate: { image },
        setCreateEntity,
    } = useCreateEntity();

    const nextPage = () => {
        navigation.navigate('gender');
    };

    const { handlePressProfileImage } = useImagePicker({
        onSuccess: (imageInfo) => {
            const uri = imageInfo.path;
            const randomNumber = Math.floor(Math.random() * 9999);
            const name = `image_${randomNumber}_${new Date().getTime()}.jpg`;
            const type = imageInfo.mime;
            setCreateEntity({ type: 'SET_IMAGE', image: { name, uri, type } });
        },
        onError: (error) => {
            if (error.code !== 'E_PICKER_CANCELLED') {
                openToast({ contents: '이미지 선택에 실패했어요. 잠시 뒤에 다시 시도해주세요.', severity: 'error' });
            }
        },
    });

    return (
        <CreateTemplate
            title="이미지를 등록해주세요"
            description="등록할 개체의 이미지를 선택해주세요."
            contents={
                <View style={styles.container}>
                    <EntityCard
                        data={{
                            entity: {
                                id: '',
                                image: { src: image?.uri ?? '' },
                                hatching: dayjs().format('YYYY-MM-DD'),
                                gender: 'Uncategorized',
                                weightUnit: 'g',
                                name: 'OOO',
                                variety: {
                                    classification: '',
                                    detailedSpecies: '기타',
                                    species: '',
                                    morph: [''],
                                },
                            },
                        }}
                        placeholderImage={
                            !image ? (
                                <View style={styles.placeholderImage}>
                                    <StrokeCamera width={100} height={100} />
                                </View>
                            ) : undefined
                        }
                        onPress={handlePressProfileImage}
                    />
                </View>
            }
            button={<ConfirmButton size="medium" variant="confirm" text="다음" onPress={nextPage} disabled={!image} />}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 430,
    },
    placeholderImage: {
        width: '100%',
        aspectRatio: '1/1',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
