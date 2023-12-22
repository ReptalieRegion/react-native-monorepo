import { createContext } from 'react';

import type { CreateEntityActions, CreateEntityState } from '../type';

export const CreateEntityStateContext = createContext<CreateEntityState | null>(null);

export const CreateEntityActionContext = createContext<React.Dispatch<CreateEntityActions> | null>(null);
