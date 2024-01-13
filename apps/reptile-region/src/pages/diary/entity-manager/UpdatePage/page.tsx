import { Typo, color, type TextColorType, type VariantType } from '@crawl/design-system';
import { useOnOff } from '@crawl/react-hooks';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import React, { useCallback, useState } from 'react';
import { Keyboard, Platform, StyleSheet, View } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import VarietyModal from './modal/VarietyModal';

import useUpdateEntity from '@/apis/diary/entity-manager/hooks/mutations/useUpdateEntity';
import { DatePicker, RightArrow } from '@/assets/icons';
import Female from '@/assets/icons/Female';
import Male from '@/assets/icons/Male';
import Question from '@/assets/icons/Question';
import { ConditionalRenderer } from '@/components/@common/atoms';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import ImagePickerIcon from '@/components/@common/molecules/ImagePickerIcon/ImagePickerIcon';
import useGlobalLoading from '@/components/@common/organisms/Loading/useGlobalLoading';
import useToast from '@/components/overlay/Toast/useToast';
import useImagePicker from '@/hooks/useImagePicker';
import type { EntityGender, EntityVariety } from '@/types/apis/diary/entity';
import type { IconFunction } from '@/types/global/icons';
import type { EntityUpdateScreenProps } from '@/types/routes/props/diary/entity';

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
    navigation,
    route: {
        params: { entity },
    },
}: EntityUpdateScreenProps) {
    const { bottom } = useSafeAreaInsets();

    const [image, setImage] = useState({
        name: `image_${Math.floor(Math.random() * 9999)}_${new Date().getTime()}.jpg`,
        uri: entity.image.src,
        type: '',
    });
    const [name, setName] = useState(entity.name);
    const [hatching, setHatching] = useState<Date | undefined>(entity.hatching ? dayjs(entity.hatching).toDate() : undefined);
    const [gender, setGender] = useState<EntityGender>(entity.gender);
    const [variety, setVariety] = useState<EntityVariety>(entity.variety);
    const { off: varietyOff, on: varietyOn, state: isVarietyVisible } = useOnOff();
    const { off: datePickerOff, on: datePickerOn, state: isDatePickerVisible } = useOnOff();
    const openToast = useToast();
    const { openLoading, closeLoading } = useGlobalLoading();

    const { handlePressProfileImage } = useImagePicker({
        onSuccess: (imageInfo) => {
            const uri = imageInfo.path;
            const type = imageInfo.mime;

            setImage((prevImage) => ({ ...prevImage, uri, type }));
        },
        onError: (error) => {
            if (error.code !== 'E_PICKER_CANCELLED') {
                openToast({ contents: '이미지 선택에 실패했어요. 잠시 뒤에 다시 시도해주세요.', severity: 'error' });
            }
        },
    });

    const { mutate, isPending } = useUpdateEntity({
        onMutate: openLoading,
        onSettled: closeLoading,
        onSuccess: () => {
            if (navigation.canGoBack()) {
                navigation.goBack();
            }
        },
        onError: () => {
            openToast({ contents: '수정에 실패했어요. 잠시후에 다시 시도해주세요.', severity: 'error' });
        },
    });

    const handlePress = useCallback((selectedGender: EntityGender) => {
        setGender(selectedGender);
    }, []);

    const handleConfirm = useCallback(
        (date: Date) => {
            setHatching(date);
            datePickerOff();
        },
        [datePickerOff],
    );

    const handleChangeText = useCallback((text: string) => {
        setName(text);
    }, []);

    const handleCompleteVariety = useCallback(
        (selectedVariety: EntityVariety) => {
            setVariety(selectedVariety);
            varietyOff();
        },
        [varietyOff],
    );

    const handleSubmit = () => {
        const files = image.uri !== entity.image.src ? image : undefined;
        mutate({ entityId: entity.id, files, gender, hatching: hatching, name, variety });
    };

    return (
        <>
            <View style={[styles.wrapper, { paddingBottom: Platform.select({ ios: bottom, android: bottom + 20 }) }]}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.container}>
                        <View style={styles.article}>
                            <Typo variant="title3">이미지</Typo>
                            <View style={imageStyles.wrapper}>
                                <ImagePickerIcon currentSize={1} maxSize={1} onPress={handlePressProfileImage} />
                                <Image source={{ uri: image.uri }} style={imageStyles.image} />
                            </View>
                        </View>
                        <View style={styles.article}>
                            <Typo variant="title3">이름</Typo>
                            <TextInput style={styles.inputWrapper} value={name} onChangeText={handleChangeText} />
                        </View>
                        <View style={styles.article}>
                            <Typo variant="title3">종/모프</Typo>
                            <TouchableOpacity onPress={varietyOn}>
                                <View style={styles.inputWrapper}>
                                    <Typo
                                        textBreakStrategy="highQuality"
                                        lineBreakMode="clip"
                                        lineBreakStrategyIOS="hangul-word"
                                        numberOfLines={1}
                                    >
                                        <Typo>{variety.classification}</Typo>
                                        <RightArrow />
                                        <Typo>{variety.species}</Typo>
                                        <RightArrow />
                                        <Typo>{variety.detailedSpecies}</Typo>
                                        <ConditionalRenderer
                                            condition={variety.morph?.length !== 0}
                                            trueContent={
                                                <>
                                                    <RightArrow />
                                                    <Typo>{variety.morph?.join(', ')}</Typo>
                                                </>
                                            }
                                        />
                                    </Typo>
                                </View>
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
                                <ConditionalRenderer
                                    condition={!!hatching}
                                    trueContent={<Typo>{dayjs(hatching).format('YYYY.MM.DD')}</Typo>}
                                    falseContent={<Typo>없음</Typo>}
                                />
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
                <View style={buttonStyles.buttonContainer}>
                    <ConfirmButton text="수정 완료" disabled={isPending || name.length === 0} onPress={handleSubmit} />
                </View>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                date={hatching}
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
        paddingHorizontal: 20,
    },
    scrollContainer: {
        paddingTop: 20,
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

const imageStyles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 15,
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

const buttonStyles = StyleSheet.create({
    buttonContainer: {
        marginTop: 'auto',
        paddingTop: 20,
    },
});
