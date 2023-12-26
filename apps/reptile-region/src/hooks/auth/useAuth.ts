import { useCallback } from 'react';

import useBaseSignInCheck from '@/apis/auth/hooks/queries/useBaseSignInCheck';
import type { SignInCheck } from '@/types/apis/auth';

export default function useAuth() {
    const { data, isLoading } = useBaseSignInCheck<boolean>({
        select: useCallback((selectData: SignInCheck['Response']) => selectData?.message === 'success', []),
    });

    return {
        isSignIn: data,
        isLoading,
    };
}
