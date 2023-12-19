import { Typo, color } from '@crawl/design-system';
import { useOnOff } from '@crawl/react-hooks';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useOverlaySelectEntityBottomSheet from '../bottom-sheet/SelectEntity/useOverlaySelectEntityBottomSheet';

import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useCreateCalendarItem from '@/apis/diary/calendar/hooks/mutations/useCreateCalendarItem';
import { Avatar } from '@/components/@common/atoms';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import useGlobalLoading from '@/components/@common/organisms/Loading/useGlobalLoading';
import TagTextCheckBox from '@/components/diary/atoms/TagTextCheckBox/index,';
import type { DiaryCalendarMarkType } from '@/types/apis/diary/calendar';
import type { FetchEntityListResponse } from '@/types/apis/diary/entity';
import type { CalendarItemCreateScreenProps } from '@/types/routes/props/diary/calendar';

type MarkTypeArray = {
    label: string;
    markType: DiaryCalendarMarkType;
};

const markTypeArray: MarkTypeArray[] = [
    { label: '#먹이', markType: '먹이급여' },
    { label: '#청소', markType: '청소' },
    { label: '#탈피', markType: '탈피' },
    { label: '#온욕', markType: '온욕' },
    { label: '#배변', markType: '배변' },
    { label: '#메이팅', markType: '메이팅' },
];

export default function CalendarItemCreatePage({ navigation }: CalendarItemCreateScreenProps) {
    const currentDate = useRef(dayjs()).current;
    const [entity, setEntity] = useState<FetchEntityListResponse['entity']>();
    const [createDate, setCreateDate] = useState(currentDate.toDate());
    const [memo, setMemo] = useState('');
    const [markTypeCheckedArray, setMarkTypeCheckedArray] = useState<DiaryCalendarMarkType[]>([]);

    const openSelectEntityBottomSheet = useOverlaySelectEntityBottomSheet({
        onSelectEntity: setEntity,
    });

    const queryClient = useQueryClient();
    const { openLoading, closeLoading } = useGlobalLoading();
    const { mutate, isPending } = useCreateCalendarItem({
        onMutate: openLoading,
        onSettled: closeLoading,
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: DIARY_QUERY_KEYS.calendar(dayjs(variables.date).startOf('month').format('YYYY-MM-DD')),
                exact: true,
            });
            navigation.navigate('bottom-tab/routes', {
                screen: 'tab',
                params: {
                    screen: 'diary/routes',
                    params: {
                        screen: 'calender',
                        params: {
                            screen: 'main',
                            params: {
                                initialDateString: dayjs(variables.date).format('YYYY-MM-DD'),
                            },
                        },
                    },
                },
            });
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const { off: datePickerOff, on: datePickerOn, state: isShowDatePicker } = useOnOff();

    const { bottom } = useSafeAreaInsets();

    const wrapperStyle: StyleProp<ViewStyle> = useMemo(() => [styes.wrapper, { paddingBottom: bottom }], [bottom]);

    const handlePressTag = useCallback((markType: DiaryCalendarMarkType, isChecked: boolean) => {
        setMarkTypeCheckedArray((prev) => {
            if (isChecked) {
                return [...prev, markType];
            }

            return prev.filter((prevMarkType) => prevMarkType !== markType);
        });
    }, []);

    const handleChangeMemo = useCallback((text: string) => {
        setMemo(text);
    }, []);

    const handleChangeDate = useCallback(
        (date: Date) => {
            setCreateDate(date);
            datePickerOff();
        },
        [datePickerOff],
    );

    const handlePressSubmit = useCallback(() => {
        const entityId = entity?.id;
        if (entityId) {
            mutate({ entityId, date: createDate, markType: markTypeCheckedArray, memo });
        }
    }, [createDate, entity?.id, markTypeCheckedArray, memo, mutate]);

    return (
        <View style={wrapperStyle}>
            <ScrollView contentContainerStyle={styes.scrollWrapper}>
                <View style={styes.allWrapper}>
                    <View style={styes.selection}>
                        <Typo variant="title2">개체 선택</Typo>
                        <TouchableOpacity onPress={() => openSelectEntityBottomSheet()}>
                            <View style={styes.entityWrapper}>
                                <Avatar image={entity?.image} size={80} />
                                <View style={styes.entityTextWrapper}>
                                    <Typo variant="title3">{entity?.name}</Typo>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styes.selection}>
                        <Typo variant="title2">메모</Typo>
                        <View style={styes.actionWrapper}>
                            <TextInput style={styes.textInput} value={memo} onChangeText={handleChangeMemo} />
                        </View>
                    </View>
                    <View style={styes.selection}>
                        <View style={styes.labelContainer}>
                            <Typo variant="title2">등록일시</Typo>
                        </View>
                        <View style={styes.actionWrapper}>
                            <TouchableOpacity onPress={datePickerOn}>
                                <Typo color="primary" variant="title4">
                                    {dayjs(createDate).format('YYYY-MM-DD A HH:mm ')}
                                </Typo>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styes.selection}>
                        <View style={styes.labelContainer}>
                            <Typo variant="title2">태그 선택</Typo>
                            <Typo color="placeholder">
                                {markTypeCheckedArray.length}/{markTypeArray.length}
                            </Typo>
                        </View>
                        <View style={styes.actionWrapper}>
                            {markTypeArray.map(({ label, markType }) => (
                                <TagTextCheckBox
                                    key={label}
                                    label={label}
                                    onChangeChecked={(isChecked) => handlePressTag(markType, isChecked)}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styes.buttonWrapper}>
                <ConfirmButton
                    text="등록"
                    disabled={isPending || markTypeCheckedArray.length === 0}
                    onPress={handlePressSubmit}
                />
            </View>
            <DateTimePickerModal
                isVisible={isShowDatePicker}
                date={createDate}
                maximumDate={currentDate.toDate()}
                mode="datetime"
                confirmTextIOS="확인"
                display="spinner"
                cancelTextIOS="취소"
                onConfirm={handleChangeDate}
                onCancel={datePickerOff}
            />
        </View>
    );
}

const White = color.White.toString();

const styes = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: White,
    },
    scrollWrapper: {
        flex: 1,
        position: 'relative',
    },
    listWrapper: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        minHeight: 2,
        zIndex: 0,
    },
    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        marginBottom: 20,
    },
    allWrapper: {
        flex: 1,
        backgroundColor: White,
        paddingHorizontal: 20,
        paddingTop: 20,
        gap: 40,
    },
    textInput: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: color.Gray[500].toString(),
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    selection: {
        gap: 15,
    },
    entityWrapper: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    entityTextWrapper: {
        flex: 1,
    },
    actionWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        zIndex: 1,
        backgroundColor: White,
        gap: 8,
    },
    buttonWrapper: {
        marginHorizontal: 20,
        marginTop: 'auto',
    },
});
