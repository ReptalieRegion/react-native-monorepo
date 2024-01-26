import useAuthOptions from '../useAuthOptions';

import useBaseAppleAuth from '@/apis/auth/hooks/mutations/useBaseAppleAuth';

export default function useAppleAuth() {
    const { authError, authSuccess } = useAuthOptions('apple');

    return useBaseAppleAuth({
        onError: authError,
        onSuccess: authSuccess,
    });
}
