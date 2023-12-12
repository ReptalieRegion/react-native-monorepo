import { useCallback, useContext, useEffect } from 'react';

import { CalendarsActionsContext } from '../contexts/CalendarsContext';

type UseCalendarHandler = {
    date?: string;
    minDate?: string;
    maxDate?: string;
};

export default function useCalendarHandler(props?: UseCalendarHandler) {
    const dispatch = useContext(CalendarsActionsContext);

    useEffect(() => {
        if (props && props?.date) {
            dispatch?.({ type: 'INIT_DATE', date: props.date, maxDate: props.maxDate, minDate: props.minDate });
        }
    }, [dispatch, props]);

    if (dispatch === null) {
        throw new Error('Calendar Provider를 감싸주세요');
    }

    const addMonth = useCallback(() => {
        dispatch({ type: 'ADD_MONTH' });
    }, [dispatch]);

    const subMonth = useCallback(() => {
        dispatch({ type: 'SUB_MONTH' });
    }, [dispatch]);

    /**
     * @param date: formate 'YYYY-MM-DD'
     */
    const setDate = useCallback(
        (date: string) => {
            dispatch({ type: 'SET_DATE', date });
        },
        [dispatch],
    );

    return {
        addMonth,
        subMonth,
        setDate,
    };
}
