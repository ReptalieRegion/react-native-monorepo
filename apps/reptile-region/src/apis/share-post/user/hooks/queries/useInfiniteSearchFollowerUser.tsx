import { useInfiniteQuery } from '@tanstack/react-query';

import { getSearchFollowerUserNickname } from '../../repository';

import { EnableParam } from '<InfiniteState>';
import type { GetSearchFollowerUserNicknameRequest, SharePostSearchFollowerUserInfiniteData } from '<SharePostUserAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useInfiniteSearchFollowerUser = ({ search, enabled = false }: GetSearchFollowerUserNicknameRequest & EnableParam) => {
    return useInfiniteQuery<SharePostSearchFollowerUserInfiniteData>({
        queryKey: sharePostQueryKeys.searchUser(search),
        queryFn: ({ pageParam }) => getSearchFollowerUserNickname({ search, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        suspense: true,
        enabled,
    });
};

export default useInfiniteSearchFollowerUser;
