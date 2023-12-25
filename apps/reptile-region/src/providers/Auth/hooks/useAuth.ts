import { useContext } from 'react';

import { AuthStateContext } from '../context';

export default function useAuth() {
    const state = useContext(AuthStateContext);

    if (state === null) {
        throw new Error('Auth Provider를 감싸주세요');
    }

    return state;
}
