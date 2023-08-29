import { useMutation } from '@tanstack/react-query';

import { updateFollow } from '../../repository';

import type { CreateFollowRequest } from '<SharePostUserAPI>';

const useUpdateFollow = ({ userId }: CreateFollowRequest) => {
    return useMutation({
        mutationFn: () => updateFollow({ userId }),
    });
};

export default useUpdateFollow;
