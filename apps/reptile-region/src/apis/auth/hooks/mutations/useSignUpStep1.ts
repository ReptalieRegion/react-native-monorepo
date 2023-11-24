import { useMutation } from '@tanstack/react-query';

import { joinProgress } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { Register0 } from '@/types/apis/auth';

// 회원가입 진행 단계에 따른 데이터 저장 - Step 1
export default function useSignUpStep1() {
    return useMutation<Register0['Response'], HTTPError, Register0['Request']>({
        mutationFn: joinProgress,
    });
}
