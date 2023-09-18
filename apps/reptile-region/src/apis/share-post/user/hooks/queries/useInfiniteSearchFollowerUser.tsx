import { useInfiniteQuery } from '@tanstack/react-query';

import { getSearchFollowerUserNickname } from '../../repository';

import type { GetSearchFollowerUserNicknameRequest, SharePostSearchFollowerUserInfiniteData } from '<SharePostUserAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useInfiniteSearchFollowerUser = ({ search }: GetSearchFollowerUserNicknameRequest) => {
    return useInfiniteQuery<SharePostSearchFollowerUserInfiniteData>({
        queryKey: sharePostQueryKeys.searchUser(search),
        queryFn: ({ pageParam }) => getSearchFollowerUserNickname({ search, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        suspense: true,
    });
};

export default useInfiniteSearchFollowerUser;
