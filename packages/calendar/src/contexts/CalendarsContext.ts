import React, { createContext } from 'react';

import type { CalendarActions, CalendarState } from '../types/calendar';

const CalendarsStateContext = createContext<CalendarState | null>(null);

const CalendarsActionsContext = createContext<React.Dispatch<CalendarActions> | null>(null);

export { CalendarsActionsContext, CalendarsStateContext };
