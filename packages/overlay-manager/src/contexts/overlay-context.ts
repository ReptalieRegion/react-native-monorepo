import { Dispatch, createContext } from 'react';

import { OverlayActions, OverlayState, ParamListBase } from '../types/overlay';

export const OverlayStateContext = createContext<OverlayState<ParamListBase, keyof ParamListBase> | null>(null);

export const OverlayActionContext = createContext<Dispatch<OverlayActions<ParamListBase, keyof ParamListBase>> | null>(null);
