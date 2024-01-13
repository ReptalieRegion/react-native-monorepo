import useAuthOptions from '../useAuthOptions';

import useBaseGoogleAuth from '@/apis/auth/hooks/mutations/useBaseGoogleAuth';

export default function useGoogleAuth() {
    const { authError, authSuccess } = useAuthOptions('google');

    return useBaseGoogleAuth({
        onError: authError,
        onSuccess: authSuccess,
    });
}
