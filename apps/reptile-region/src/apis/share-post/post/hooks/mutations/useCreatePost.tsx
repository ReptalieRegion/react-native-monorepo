import type { InfiniteData } from '@tanstack/react-query';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost } from '../../repository';

import type { CreatePost, FetchDetailUserPost, FetchPost } from '<api/share/post>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { sharePostQueryKeys } from '@/apis/@utils/query-keys';

type UseCreatePostProps = {
    onSuccess: () => void;
};

/** 일상공유 무한스크롤 조회 리스트 게시물 추가 */
const updateSharePostListCache = ({ queryClient, data }: { queryClient: QueryClient; data: CreatePost['Response'] }) => {
    const queryKey = sharePostQueryKeys.list;
    queryClient.setQueryData<InfiniteData<FetchPost['Response']>>(queryKey, (prevPostList) => {
        if (prevPostList === undefined) {
            return prevPostList;
        }

        const { pageParams, pages } = prevPostList;

        const updatePages = [...pages];
        updatePages[0] = {
            ...updatePages[0],
            items: [data, ...updatePages[0].items],
        };

        return {
            pageParams,
            pages: updatePages,
        };
    });
};

/** 일상공유 무한스크롤 조회 리스트 게시물 추가 */
const updateSharePostDetailUserListCache = ({
    queryClient,
    data,
}: {
    queryClient: QueryClient;
    data: CreatePost['Response'];
}) => {
    const queryKey = sharePostQueryKeys.detailUserPosts(data.post.user.nickname);
    queryClient.setQueryData<InfiniteData<FetchDetailUserPost['Response']>>(queryKey, (prevDetailUserPostList) => {
        if (prevDetailUserPostList === undefined) {
            return prevDetailUserPostList;
        }

        const { pageParams, pages } = prevDetailUserPostList;
        const updatePages = [...pages];
        updatePages[0] = {
            ...updatePages[0],
            items: [data, ...updatePages[0].items],
        };

        return {
            pageParams,
            pages: updatePages,
        };
    });
};

const useCreatePost = ({ onSuccess }: UseCreatePostProps) => {
    const queryClient = useQueryClient();

    return useMutation<CreatePost['Response'], HTTPError, CreatePost['Request']>({
        mutationFn: ({ contents, selectedPhotos }) => createPost({ contents, selectedPhotos }),
        onSuccess: (data) => {
            updateSharePostListCache({ queryClient, data });
            updateSharePostDetailUserListCache({ queryClient, data });
            onSuccess();
        },
    });
};

export default useCreatePost;
