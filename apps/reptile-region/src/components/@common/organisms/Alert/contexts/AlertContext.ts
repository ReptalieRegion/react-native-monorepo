import { createContext } from 'react';

import type { AlertActions, AlertState } from '../types';

export const AlertStateContext = createContext<AlertState | null>(null);

export const AlertActionsContext = createContext<React.Dispatch<AlertActions> | null>(null);
