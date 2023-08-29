import { useInfiniteQuery } from '@tanstack/react-query';

import { getDetailUserPostImages } from '../../repository';

import type { GetDetailUserPostImagesRequest, SharePostImagesInfiniteData } from '<SharePostAPI>';
import { postQueryKeys } from '@/apis/share-post/query-keys';

const useInfiniteUserPostImages = ({ userId }: GetDetailUserPostImagesRequest) => {
    return useInfiniteQuery<SharePostImagesInfiniteData>({
        queryKey: postQueryKeys.detailImage(userId),
        queryFn: ({ pageParam }) => getDetailUserPostImages({ userId, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

export default useInfiniteUserPostImages;
