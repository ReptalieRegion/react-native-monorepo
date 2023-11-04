import { useMutation } from '@tanstack/react-query';

import { signOut } from '../../repository';

import type { SignOut } from '<api/auth>';

const useSignOut = () => {
    return useMutation<SignOut['Response'], any, SignOut['Request'], unknown>({
        mutationFn: signOut,
    });
};

export default useSignOut;
