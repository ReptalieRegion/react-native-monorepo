import React, { useReducer, type ReactNode } from 'react';

import { CreateEntityActionContext, CreateEntityStateContext } from '../context/CreateEntityContext';
import createEntityReducer from '../reducer/createEntityReducer';
import type { CreateEntityState } from '../type';

const initialData: CreateEntityState = {
    gender: null,
    image: null,
    hatchingDate: null,
    name: null,
    weight: null,
};

export default function CreateEntity({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(createEntityReducer, initialData);

    return (
        <CreateEntityActionContext.Provider value={dispatch}>
            <CreateEntityStateContext.Provider value={state}>{children}</CreateEntityStateContext.Provider>
        </CreateEntityActionContext.Provider>
    );
}
