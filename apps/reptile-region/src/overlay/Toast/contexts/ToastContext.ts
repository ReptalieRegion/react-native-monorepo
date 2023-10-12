import { createContext } from 'react';

import type { ToastActions, ToastState } from '../types';

export const ToastStateContext = createContext<ToastState | null>(null);

export const ToastActionsContext = createContext<React.Dispatch<ToastActions> | null>(null);
