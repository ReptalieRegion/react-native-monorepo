import { useInfiniteQuery } from '@tanstack/react-query';

import { getSearchFollowerUserNickname } from '../../repository';

import type { FetchFollowerSearch } from '<api/share/post/user>';
import type { EnableParam } from '<api/utils>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useInfiniteSearchFollowerUser = ({ search, enabled = false }: FetchFollowerSearch['Request'] & EnableParam) => {
    return useInfiniteQuery<FetchFollowerSearch['Response']>({
        queryKey: sharePostQueryKeys.searchUser(search),
        queryFn: ({ pageParam }) => getSearchFollowerUserNickname({ search, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        suspense: true,
        enabled,
    });
};

export default useInfiniteSearchFollowerUser;
