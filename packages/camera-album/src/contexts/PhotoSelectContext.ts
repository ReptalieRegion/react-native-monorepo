import React, { createContext } from 'react';

import type { PhotoSelectState, PhotoSelectedActions } from '../types';

export const PhotoSelectStateContext = createContext<PhotoSelectState | null>(null);

export const PhotoSelectActionsContext = createContext<React.Dispatch<PhotoSelectedActions> | null>(null);
