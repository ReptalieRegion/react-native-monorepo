import { createContext } from 'react';

import type { PhotoSelectActions, PhotoSelectState } from '../types';

export const PhotoSelectStateContext = createContext<PhotoSelectState | null>(null);

export const PhotoSelectActionsContext = createContext<React.Dispatch<PhotoSelectActions> | null>(null);
