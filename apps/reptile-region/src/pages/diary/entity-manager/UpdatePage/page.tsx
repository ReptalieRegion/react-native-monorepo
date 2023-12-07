import { Typo, color, type TextColorType, type VariantType } from '@reptile-region/design-system';
import { useOnOff } from '@reptile-region/react-hooks';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import VarietyModal from './modal/VarietyModal';

import { DatePicker } from '@/assets/icons';
import Female from '@/assets/icons/Female';
import Male from '@/assets/icons/Male';
import Question from '@/assets/icons/Question';
import type { EntityGender, EntityVariety } from '@/types/apis/diary/entity';
import type { IconFunction } from '@/types/global/icons';
import type { EntityUpdateScreenProps } from '@/types/routes/props/diary';

type GenderMapItem = {
    text: string;
    gender: EntityGender;
    Icon: IconFunction;
    color: string;
};

const GENDER_MAP: GenderMapItem[] = [
    { text: '암컷', gender: 'Female', Icon: Female, color: color.Pink[500].toString() },
    { text: '수컷', gender: 'Male', Icon: Male, color: color.Blue[500].toString() },
    { text: '미구분', gender: 'Uncategorized', Icon: Question, color: color.Red[500].toString() },
];

export default function EntityMangerUpdate({
    route: {
        params: { entity },
    },
}: EntityUpdateScreenProps) {
    const [name, setName] = useState(entity.name);
    const [selectedDate, setSelectedDate] = useState(dayjs(entity.hatching).toDate());
    const [gender, setGender] = useState<EntityGender>('Female');
    const [variety, setVariety] = useState<EntityVariety>(entity.variety);
    console.log(variety);
    const { off: varietyOff, on: varietyOn, state: isVarietyVisible } = useOnOff();
    const { off: datePickerOff, on: datePickerOn, state: isDatePickerVisible } = useOnOff();

    const handlePress = useCallback((selectedGender: EntityGender) => {
        setGender(selectedGender);
    }, []);

    const handleConfirm = useCallback(
        (date: Date) => {
            setSelectedDate(date);
            datePickerOff();
        },
        [datePickerOff],
    );

    const handleChangeText = (text: string) => {
        setName(text);
    };

    const handleCompleteVariety = (selectedVariety: EntityVariety) => {
        setVariety(selectedVariety);
        varietyOff();
    };

    return (
        <>
            <View style={styles.wrapper}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.container}>
                    <View style={styles.article}>
                        <Typo variant="title3">이름</Typo>
                        <TextInput style={styles.inputWrapper} value={name} onChangeText={handleChangeText} />
                    </View>
                    <View style={styles.article}>
                        <Typo variant="title3">종/모프</Typo>
                        <TouchableOpacity onPress={varietyOn} containerStyle={styles.inputWrapper}>
                            <Typo>{`${variety.classification} > ${variety.detailedSpecies} > ${variety.species}`}</Typo>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.article}>
                        <Typo variant="title3">성별</Typo>
                        <View style={genderStyles.container}>
                            {GENDER_MAP.map(({ gender: selectedGender, Icon, color: genderColor, text }) => {
                                const isSelected = gender === selectedGender;
                                const selectedStyles = isSelected ? { borderColor: genderColor } : {};
                                const selectedIconStyles = isSelected ? genderColor : color.Gray[500].toString();
                                const selectedTextStyles: { variant: VariantType; color: TextColorType } = isSelected
                                    ? { variant: 'title3', color: 'default' }
                                    : { variant: 'body2', color: 'placeholder' };

                                return (
                                    <TouchableOpacity
                                        key={selectedGender}
                                        onPress={() => handlePress(selectedGender)}
                                        style={[genderStyles.iconWrapper, selectedStyles]}
                                        containerStyle={genderStyles.iconContainer}
                                    >
                                        <Icon width={24} height={24} fill={selectedIconStyles} />
                                        <Typo variant={selectedTextStyles.variant} color={selectedTextStyles.color}>
                                            {text}
                                        </Typo>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                    <View style={styles.article}>
                        <Typo variant="title3">해칭일</Typo>
                        <TouchableOpacity onPress={datePickerOn} style={styles.inputWrapper}>
                            <DatePicker />
                            <Typo>{dayjs(selectedDate).format('YYYY.MM.DD')}</Typo>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                date={selectedDate}
                maximumDate={dayjs().toDate()}
                mode="date"
                confirmTextIOS="확인"
                display="inline"
                cancelTextIOS="취소"
                onConfirm={handleConfirm}
                onCancel={datePickerOff}
            />
            <VarietyModal
                visible={isVarietyVisible}
                initialSelected={variety}
                onClose={varietyOff}
                onComplete={handleCompleteVariety}
            />
        </>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
        padding: 20,
    },
    container: {
        gap: 30,
    },
    article: {
        gap: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: color.Gray[500].toString(),
        borderRadius: 10,
        gap: 10,
        paddingHorizontal: 10,
        height: 45,
    },
});

const genderStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: color.Gray[500].toString(),
        borderWidth: 1,
        justifyContent: 'center',
        paddingVertical: 5,
        borderRadius: 10,
        height: 45,
    },
    iconContainer: {
        flex: 1,
    },
});
