import { useMutation } from '@tanstack/react-query';

import { createLike } from '../../repository';

import type { CreateLikeRequest } from '<SharePostAPI>';

const useUpdateLike = ({ postId }: CreateLikeRequest) => {
    return useMutation({
        mutationKey: [''],
        mutationFn: () => createLike({ postId }),
    });
};

export default useUpdateLike;
