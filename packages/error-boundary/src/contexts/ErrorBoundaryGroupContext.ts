import { createContext } from 'react';

import type { ErrorBoundaryGroup } from '../types';

export const ErrorBoundaryGroupContext = createContext<ErrorBoundaryGroup | null>(null);
