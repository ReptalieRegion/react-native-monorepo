import { useMutation } from '@tanstack/react-query';

import { updateLike } from '../../repository';

import type { UpdateLikeRequest } from '<SharePostAPI>';

const useUpdateLike = ({ postId }: UpdateLikeRequest) => {
    return useMutation({
        mutationKey: [''],
        mutationFn: () => updateLike({ postId }),
    });
};

export default useUpdateLike;
