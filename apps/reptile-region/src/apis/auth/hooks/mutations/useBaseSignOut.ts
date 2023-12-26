import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { signOut } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { SignOut } from '@/types/apis/auth';

// 로그아웃
export default function useBaseSignOut(
    props?: Pick<UseMutationOptions<SignOut['Response'], HTTPError, SignOut['Request'], unknown>, 'onSuccess' | 'onError'>,
) {
    return useMutation<SignOut['Response'], HTTPError, SignOut['Request'], unknown>({
        mutationFn: signOut,
        ...props,
    });
}
