import { Typo, color } from '@crawl/design-system';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useOverlaySelectEntityBottomSheet from '../@common/bottom-sheet/SelectEntity/useOverlaySelectEntityBottomSheet';
import TagTextCheckBox from '../@common/components/TagTextCheckBox';
import { markTypeArray } from '../@common/constants';

import useCreateCalendarActions from './hooks/useCreateCalendarActions';

import { Avatar } from '@/components/@common/atoms';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';

const MAX_MEMO_LENGTH = 300;

export default function CalendarItemCreatePage() {
    const {
        disabledSubmit,
        isShowDatePicker,
        today,
        entity,
        memo,
        createDate,
        markTypeCheckedArray,
        datePickerOff,
        datePickerOn,
        handleChangeDate,
        handleChangeEntity,
        handleChangeMemo,
        handlePressSubmit,
        handlePressTag,
    } = useCreateCalendarActions();

    const openSelectEntityBottomSheet = useOverlaySelectEntityBottomSheet({
        onSelectEntity: handleChangeEntity,
    });

    const { bottom } = useSafeAreaInsets();

    const wrapperStyle: StyleProp<ViewStyle> = useMemo(() => [styles.wrapper, { paddingBottom: bottom }], [bottom]);

    return (
        <View style={wrapperStyle}>
            <ScrollView contentContainerStyle={styles.scrollWrapper}>
                <View style={styles.allWrapper}>
                    <View style={styles.selection}>
                        <Typo variant="title2">개체 선택</Typo>
                        <TouchableOpacity onPress={() => openSelectEntityBottomSheet()}>
                            <View style={styles.entityWrapper}>
                                <Avatar image={entity?.image} size={80} />
                                <View style={styles.entityTextWrapper}>
                                    <Typo variant="title3">{entity?.name}</Typo>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.selection}>
                        <View style={styles.labelContainer}>
                            <Typo variant="title2">메모</Typo>
                            <Typo color="placeholder">
                                {memo.length}/{MAX_MEMO_LENGTH}
                            </Typo>
                        </View>
                        <View style={styles.actionWrapper}>
                            <TextInput
                                style={styles.textInput}
                                value={memo}
                                onChangeText={handleChangeMemo}
                                maxLength={MAX_MEMO_LENGTH}
                            />
                        </View>
                    </View>
                    <View style={styles.selection}>
                        <View style={styles.labelContainer}>
                            <Typo variant="title2">등록일시</Typo>
                        </View>
                        <View style={styles.actionWrapper}>
                            <TouchableOpacity onPress={datePickerOn}>
                                <Typo color="primary" variant="title4">
                                    {dayjs(createDate).format('YYYY-MM-DD A HH:mm ')}
                                </Typo>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.selection}>
                        <View style={styles.labelContainer}>
                            <Typo variant="title2">태그 선택</Typo>
                            <Typo color="placeholder">
                                {markTypeCheckedArray.length}/{markTypeArray.length}
                            </Typo>
                        </View>
                        <View style={styles.actionWrapper}>
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
            <View style={styles.buttonWrapper}>
                <ConfirmButton text="등록" disabled={disabledSubmit} onPress={handlePressSubmit} />
            </View>
            <DateTimePickerModal
                isVisible={isShowDatePicker}
                date={createDate}
                maximumDate={today.toDate()}
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

const styles = StyleSheet.create({
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
