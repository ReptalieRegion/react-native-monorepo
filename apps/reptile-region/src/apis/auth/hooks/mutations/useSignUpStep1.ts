import { useMutation } from '@tanstack/react-query';

import { joinProgress } from '../../repository';

import type { Register0 } from '<api/auth>';
import type HTTPError from '@/apis/@utils/error/HTTPError';

const useSignUpStep1 = () => {
    return useMutation<Register0['Response'], HTTPError, Register0['Request']>({
        mutationFn: joinProgress,
    });
};

export default useSignUpStep1;
