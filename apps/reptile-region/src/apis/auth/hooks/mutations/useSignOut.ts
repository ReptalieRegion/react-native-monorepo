import { useMutation } from '@tanstack/react-query';

import { signOut } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { SignOut } from '@/types/apis/auth';

// 로그아웃
export default function useSignOut() {
    return useMutation<SignOut['Response'], HTTPError, SignOut['Request'], unknown>({
        mutationFn: signOut,
    });
}
