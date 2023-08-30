import { useMutation } from '@tanstack/react-query';

import { createLike } from '../../repository';

import type { CreateLikeRequest } from '<SharePostAPI>';

const useUpdateLike = () => {
    return useMutation({
        mutationKey: [''],
        mutationFn: ({ postId }: CreateLikeRequest) => createLike({ postId }),
    });
};

export default useUpdateLike;
