import { createContext } from 'react';
import type { Dispatch } from 'react';

import type { OverlayActions, OverlayState, ParamListBase } from '../types/overlay';

export const OverlayStateContext = createContext<OverlayState<ParamListBase, keyof ParamListBase> | null>(null);

export const OverlayActionContext = createContext<Dispatch<OverlayActions<ParamListBase, keyof ParamListBase>> | null>(null);
