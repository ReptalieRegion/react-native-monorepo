import React, { createContext } from 'react';

import type { PhotoActions, PhotoState } from '../types';

export const PhotoStateContext = createContext<PhotoState | null>(null);

export const PhotoActionsContext = createContext<React.Dispatch<PhotoActions> | null>(null);
