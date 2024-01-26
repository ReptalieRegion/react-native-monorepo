import useAuthOptions from '../useAuthOptions';

import useBaseKakaoAuth from '@/apis/auth/hooks/mutations/useBaseKakaoAuth';

export default function useKakaoAuth() {
    const { authError, authSuccess } = useAuthOptions('kakao');

    return useBaseKakaoAuth({
        onError: authError,
        onSuccess: authSuccess,
    });
}
