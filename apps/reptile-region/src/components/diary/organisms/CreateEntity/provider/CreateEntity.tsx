import React, { useReducer, type ReactNode } from 'react';

import { CreateEntityActionContext, CreateEntityStateContext } from '../context/CreateEntityContext';
import createEntityReducer from '../reducer/createEntityReducer';
import type { CreateEntityState } from '../type';

import { 분류리스트 } from '@/json/entity';

const initialData: CreateEntityState = {
    gender: null,
    image: null,
    hatchingDate: null,
    variety: {
        selected: {
            분류: '',
            상세종: '',
            종: '',
            모프로컬: [],
        },
        list: [
            {
                type: '분류',
                itemList: 분류리스트,
            },
            {
                type: '종',
                itemList: [],
            },
            {
                type: '상세종',
                itemList: [],
            },
            {
                type: '모프로컬',
                itemList: [],
            },
        ],
    },
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
