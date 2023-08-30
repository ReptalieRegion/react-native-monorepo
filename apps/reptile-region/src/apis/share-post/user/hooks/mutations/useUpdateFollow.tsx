import { useMutation } from '@tanstack/react-query';

import { updateFollow } from '../../repository';

import type { UpdateFollowRequest } from '<SharePostUserAPI>';

const useUpdateFollow = () => {
    return useMutation({
        mutationFn: ({ userId }: UpdateFollowRequest) => updateFollow({ userId }),
    });
};

export default useUpdateFollow;
