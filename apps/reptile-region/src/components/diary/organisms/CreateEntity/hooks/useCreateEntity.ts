import { useCallback, useContext } from 'react';

import { CreateEntityActionContext, CreateEntityStateContext } from '../context/CreateEntityContext';
import type { CreateEntityActions } from '../type';

export default function useCreateEntity() {
    const state = useContext(CreateEntityStateContext);
    const dispatch = useContext(CreateEntityActionContext);

    if (dispatch === null || state === null) {
        throw new Error('CreateEntity Provider를 감싸주세요.');
    }

    const setCreateEntity = useCallback(
        (props: CreateEntityActions) => {
            dispatch(props);
        },
        [dispatch],
    );

    return {
        entityDate: state,
        setCreateEntity,
    };
}
