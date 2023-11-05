import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';

import { getSearchFollowerUserNickname } from '../../repository';

import type { FetchFollowerSearch } from '<api/share/post/user>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { sharePostQueryKeys } from '@/apis/@utils/query-keys';

const useInfiniteSearchFollowerUser = ({ search }: FetchFollowerSearch['Request']) => {
    return useSuspenseInfiniteQuery<
        FetchFollowerSearch['Response'],
        HTTPError,
        InfiniteData<FetchFollowerSearch['Response']>,
        readonly string[],
        number
    >({
        queryKey: sharePostQueryKeys.searchUser(search),
        initialPageParam: 0,
        queryFn: ({ pageParam }) => getSearchFollowerUserNickname({ search, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

export default useInfiniteSearchFollowerUser;
