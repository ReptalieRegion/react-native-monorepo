import { createContext } from 'react';

import type { OverlayContextActions } from './types';

export const OverlayContext = createContext<OverlayContextActions | null>(null);
