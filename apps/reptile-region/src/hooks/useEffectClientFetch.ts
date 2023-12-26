import { useEffect } from 'react';

import useAuthHandler from './auth/useAuthHandler';

import { initRefreshFailCallback } from '@/apis/@utils/fetcher';

export default function useEffectClientFetch() {
    const { signOut } = useAuthHandler();

    /**
     * clientFetch에서 refresh 실패했을 때 실행할 로직 초기화
     */
    useEffect(() => {
        console.log('[init] clientFetch');
        initRefreshFailCallback(signOut);
    }, [signOut]);
}
