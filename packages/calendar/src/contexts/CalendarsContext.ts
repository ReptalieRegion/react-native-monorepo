import React, { createContext } from 'react';

import type { CalendarActions, CalendarState } from '../type';

const CalendarsStateContext = createContext<CalendarState | null>(null);

const CalendarsActionsContext = createContext<React.Dispatch<CalendarActions> | null>(null);

export { CalendarsActionsContext, CalendarsStateContext };
