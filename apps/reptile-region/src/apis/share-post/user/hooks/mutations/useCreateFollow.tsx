import { useMutation } from '@tanstack/react-query';

import { updateFollow } from '../../repository';

import type { CreateFollowRequest } from '<SharePostUserAPI>';

const useUpdateFollow = () => {
    return useMutation({
        mutationFn: ({ userId }: CreateFollowRequest) => updateFollow({ userId }),
    });
};

export default useUpdateFollow;
