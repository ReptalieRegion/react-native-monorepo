import { useIsFocused } from '@react-navigation/native';
import React from 'react';

import { ConditionalRenderer } from '@/components/@common/atoms';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import { EditProfile } from '@/components/@common/molecules/Profile';
import { useToast } from '@/components/@common/organisms/Toast';
import useCreateEntity from '@/components/diary/organisms/CreateEntity/hooks/useCreateEntity';
import CreateTemplate from '@/components/diary/templates/CreateTemplate/CreateTemplate';
import useImagePicker from '@/hooks/@common/useImagePicker';
import type { EntityManagerCreateImageScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerImagePage({ navigation }: EntityManagerCreateImageScreenProps) {
    const { openToast } = useToast();
    const isFocused = useIsFocused();
    const {
        entityDate: { image },
        setCreateEntity,
    } = useCreateEntity();

    const nextPage = () => {
        navigation.navigate('gender');
    };

    const { handlePressProfileImage } = useImagePicker({
        onSuccess: (imageInfo) => {
            const sourceURL = imageInfo.sourceURL;
            const uri = imageInfo.path;
            const randomNumber = Math.floor(Math.random() * 9999);
            const name = `image_${randomNumber}_${new Date().getTime()}.jpg`;
            const type = imageInfo.mime;
            setCreateEntity({ type: 'SET_IMAGE', image: { sourceURL, name, uri, type } });
            navigation.navigate('gender');
            nextPage();
        },
        onError: (error) => {
            if (error.message !== 'User cancelled image selection') {
                openToast({ contents: '이미지 선택에 실패했어요. 잠시 뒤에 다시 시도해주세요.', severity: 'error' });
            }
        },
    });

    return (
        <CreateTemplate
            title="이미지를 등록해주세요"
            description="등록할 개체의 이미지를 선택해주세요."
            contents={
                <EditProfile
                    imageSize={200}
                    cameraSize={30}
                    profile={{ src: image?.sourceURL ?? '' }}
                    onPress={handlePressProfileImage}
                />
            }
            button={
                <ConditionalRenderer
                    condition={isFocused && !!image}
                    trueContent={<ConfirmButton size="medium" variant="confirm" text="다음" onPress={nextPage} />}
                />
            }
        />
    );
}
