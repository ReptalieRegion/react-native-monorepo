import RNDateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import React, { useCallback, useEffect } from 'react';

import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import useCreateEntity from '@/components/diary/organisms/CreateEntity/hooks/useCreateEntity';
import CreateTemplate from '@/components/diary/templates/CreateTemplate/CreateTemplate';
import type { EntityManagerCreateHatchingScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerHatchingDayPage({ navigation }: EntityManagerCreateHatchingScreenProps) {
    const currentDate = new Date();
    const {
        entityDate: { hatchingDate },
        setCreateEntity,
    } = useCreateEntity();

    useEffect(() => {
        setCreateEntity({ type: 'SET_HATCHING_DATE', hatchingDate: new Date() });
    }, [setCreateEntity]);

    const handleChangeDate = useCallback(
        (_: DateTimePickerEvent, date: Date | undefined) => {
            if (date) {
                setCreateEntity({ type: 'SET_HATCHING_DATE', hatchingDate: date });
            }
        },
        [setCreateEntity],
    );

    const nextPage = useCallback(() => {
        navigation.navigate('type-and-morph');
    }, [navigation]);

    return (
        <CreateTemplate
            title="해칭일을 등록해주세요"
            description="등록할 개체의 해칭일을 선택해주세요."
            contents={
                <RNDateTimePicker
                    display="spinner"
                    timeZoneName="Asia/Seoul"
                    value={hatchingDate ?? currentDate}
                    maximumDate={currentDate}
                    minimumDate={dayjs(currentDate).subtract(50, 'year').toDate()}
                    onChange={handleChangeDate}
                />
            }
            button={<ConfirmButton size="medium" variant="confirm" text="다음" onPress={nextPage} />}
        />
    );
}
