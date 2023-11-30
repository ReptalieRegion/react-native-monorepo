import RNDateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { useWindowDimensions } from 'react-native';

import { TextButton } from '@/components/@common/atoms';
import CreateTemplate from '@/components/diary/CreateTemplate/CreateTemplate';
import type { EntityManagerCreateHatchingScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerHatchingDayPage({ navigation }: EntityManagerCreateHatchingScreenProps) {
    const { width } = useWindowDimensions();
    const nextPage = () => {
        navigation.navigate('type-and-morph');
    };

    return (
        <CreateTemplate
            title="해칭일을 등록해주세요."
            description="등록할 개체의 해칭일을 선택해주세요."
            contents={
                <RNDateTimePicker
                    display="spinner"
                    timeZoneName="Asia/Seoul"
                    value={new Date()}
                    maximumDate={new Date()}
                    minimumDate={new Date(1950, 0, 1)}
                />
            }
            button={
                <TextButton
                    type="view"
                    text="다음"
                    color="surface"
                    border="OVAL"
                    variant="body2"
                    onPress={nextPage}
                    containerStyle={{ width: width - 150 }}
                />
            }
        />
    );
}
