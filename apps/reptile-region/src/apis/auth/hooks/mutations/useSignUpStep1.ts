import { useMutation } from '@tanstack/react-query';

import { joinProgress } from '../../repository';

import type { Register0 } from '<api/auth>';

const useSignUpStep1 = () => {
    return useMutation<Register0['Response'], any, Register0['Request']>({
        mutationFn: joinProgress,
    });
};

export default useSignUpStep1;
