import { useOnOff } from '@crawl/react-hooks';
import dayjs from 'dayjs';
import { useCallback, useMemo, useRef, useState } from 'react';

import useCreateCalendarItem from './mutations/useCreateCalendarItem';

import type { DiaryCalendarMarkType } from '@/types/apis/diary/calendar';
import type { FetchEntityListResponse } from '@/types/apis/diary/entity';

export default function useCreateCalendarActions() {
    const today = useRef(dayjs()).current;

    // 개체 선택
    const [entity, setEntity] = useState<FetchEntityListResponse['entity']>();

    // 메모
    const [memo, setMemo] = useState('');
    const handleChangeMemo = useCallback((text: string) => {
        setMemo(text);
    }, []);

    // 기록 날짜
    const [createDate, setCreateDate] = useState(today.toDate());
    const { off: datePickerOff, on: datePickerOn, state: isShowDatePicker } = useOnOff();
    const handleChangeDate = useCallback(
        (date: Date) => {
            setCreateDate(date);
            datePickerOff();
        },
        [datePickerOff],
    );

    // 태그
    const [markTypeCheckedArray, setMarkTypeCheckedArray] = useState<DiaryCalendarMarkType[]>([]);
    const handlePressTag = useCallback((markType: DiaryCalendarMarkType, isChecked: boolean) => {
        setMarkTypeCheckedArray((prev) => {
            if (isChecked) {
                return [...prev, markType];
            }

            return prev.filter((prevMarkType) => prevMarkType !== markType);
        });
    }, []);

    // 등록
    const { mutate, isPending } = useCreateCalendarItem();
    const handlePressSubmit = useCallback(() => {
        const entityId = entity?.id;
        if (entityId) {
            mutate({ entityId, date: createDate, markType: markTypeCheckedArray, memo });
        }
    }, [createDate, entity?.id, markTypeCheckedArray, memo, mutate]);

    // 액션 및 상태
    const actions = useMemo(
        () => ({
            handleChangeEntity: setEntity,
            handleChangeMemo,
            handleChangeDate,
            handlePressSubmit,
            handlePressTag,
            datePickerOn,
            datePickerOff,
        }),
        [datePickerOn, datePickerOff, handleChangeDate, handleChangeMemo, handlePressSubmit, handlePressTag],
    );

    const state = {
        today,
        disabledSubmit: isPending || markTypeCheckedArray.length === 0,
        isShowDatePicker,
        entity,
        memo,
        createDate,
        markTypeCheckedArray,
    };

    return {
        ...actions,
        ...state,
    };
}
