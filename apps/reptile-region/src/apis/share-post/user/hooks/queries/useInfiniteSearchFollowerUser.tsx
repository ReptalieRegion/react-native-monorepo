import { useInfiniteQuery } from '@tanstack/react-query';

import { getSearchFollowerUserNickname } from '../../repository';

import { EnableParam } from '<InfiniteState>';
import type { GetSearchFollowerUserNicknameRequest, SharePostSearchFollowerUserInfiniteData } from '<SharePostUserAPI>';
import { userQueryKeys } from '@/apis/share-post/query-keys';

const useInfiniteSearchFollowerUser = ({ search, enabled }: GetSearchFollowerUserNicknameRequest & EnableParam) => {
    return useInfiniteQuery<SharePostSearchFollowerUserInfiniteData>({
        queryKey: userQueryKeys.searchUser(search),
        queryFn: ({ pageParam }) => getSearchFollowerUserNickname({ search, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        enabled,
    });
};

export default useInfiniteSearchFollowerUser;
