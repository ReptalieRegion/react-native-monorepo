import { useQuery } from '@tanstack/react-query';

import { fetchMePostList } from '../../repository';

import type { FetchMePostList } from '<api/my/profile>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { MY_QUERY_KEYS } from '@/apis/@utils/query-keys';

const useFetchMePostList = () => {
    return useQuery<FetchMePostList['Response'], HTTPError, FetchMePostList['Request'], readonly string[]>({
        queryKey: MY_QUERY_KEYS.post,
        queryFn: fetchMePostList,
    });
};

export default useFetchMePostList;
