import { useContext } from 'react';

import { CreateEntityStateContext } from '../context/CreateEntityContext';

const useCreateEntityState = () => {
    const state = useContext(CreateEntityStateContext);

    if (state === null) {
        throw new Error('CreateEntity Provider를 감싸주세요');
    }

    return state;
};

export default useCreateEntityState;
