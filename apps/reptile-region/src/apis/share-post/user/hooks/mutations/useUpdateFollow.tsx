import { useMutation } from '@tanstack/react-query';

import { updateFollow } from '../../repository';

import type { UpdateFollowRequest } from '<SharePostUserAPI>';

const useUpdateFollow = ({ userId }: UpdateFollowRequest) => {
    return useMutation({
        mutationFn: () => updateFollow({ userId }),
    });
};

export default useUpdateFollow;
