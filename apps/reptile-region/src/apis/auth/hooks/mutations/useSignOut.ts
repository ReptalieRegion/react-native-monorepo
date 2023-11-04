import { useMutation } from '@tanstack/react-query';

import { signOut } from '../../repository';

import type { SignOut } from '<api/auth>';
import type HTTPError from '@/apis/@utils/error/HTTPError';

const useSignOut = () => {
    return useMutation<SignOut['Response'], HTTPError, SignOut['Request'], unknown>({
        mutationFn: signOut,
    });
};

export default useSignOut;
