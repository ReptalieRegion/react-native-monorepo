import { useInfiniteQuery } from '@tanstack/react-query';

import { getDetailUserPostImages } from '../../repository';

import type { GetDetailUserPostImagesRequest, SharePostImagesInfiniteData } from '<SharePostAPI>';
import { postQueryKeys } from '@/apis/share-post/query-keys';

const useInfiniteUserPostImages = ({ userId, nickname }: GetDetailUserPostImagesRequest) => {
    return useInfiniteQuery<SharePostImagesInfiniteData>({
        queryKey: postQueryKeys.detailImage(userId ?? nickname ?? ''),
        queryFn: ({ pageParam }) => getDetailUserPostImages({ userId, nickname, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

export default useInfiniteUserPostImages;
