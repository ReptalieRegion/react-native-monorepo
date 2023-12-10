import { useCallback, useContext } from 'react';

import { CalendarsActionsContext } from '../contexts/CalendarsContext';

export default function useCalendarHandler() {
    const dispatch = useContext(CalendarsActionsContext);

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
