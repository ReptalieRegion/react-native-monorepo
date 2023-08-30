import { useMutation } from '@tanstack/react-query';

import { updateLike } from '../../repository';

import type { UpdateLikeRequest } from '<SharePostAPI>';

const useUpdateLike = () => {
    return useMutation({
        mutationKey: [''],
        mutationFn: ({ postId }: UpdateLikeRequest) => updateLike({ postId }),
    });
};

export default useUpdateLike;
