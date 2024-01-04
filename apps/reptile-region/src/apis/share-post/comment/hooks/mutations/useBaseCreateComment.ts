import type { InfiniteData, UseMutationOptions } from '@tanstack/react-query';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { createComment } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { CreateComment } from '@/types/apis/share-post/comment';
import type { FetchPosts } from '@/types/apis/share-post/post';

export default function useBaseCreateComment<TContext = unknown>(
    props?: Pick<
        UseMutationOptions<CreateComment['Response'], HTTPError, CreateComment['Request'], TContext>,
        'onError' | 'onMutate' | 'onSuccess' | 'onSettled'
    >,
) {
    const queryClient = useQueryClient();

    return useMutation<CreateComment['Response'], HTTPError, CreateComment['Request'], TContext>({
        mutationFn: ({ postId, contents }) => createComment({ postId, contents }),
        ...props,
        onSuccess: (data, variables, context) => {
            props?.onSuccess?.(data, variables, context);
            queryClient.invalidateQueries({ queryKey: SHARE_POST_QUERY_KEYS.comment(data.post.id) });
            updateSharePostListCache({ queryClient, data });
        },
    });
}

// 일상공유 무한스크롤 조회 리스트 댓글 개수 증가
function updateSharePostListCache({ queryClient, data }: { queryClient: QueryClient; data: CreateComment['Response'] }) {
    const queryKey = SHARE_POST_QUERY_KEYS.list;

    queryClient.setQueryData<InfiniteData<FetchPosts['Response']>>(queryKey, (prevPostList) => {
        if (prevPostList === undefined) {
            return prevPostList;
        }

        const { pageParams, pages } = prevPostList;

        const updatePages = [...pages].map((page) => {
            const { nextPage, items } = page;
            return {
                nextPage,
                items: items.map((item) => {
                    const isTargetPost = item.post.id === data.post.id;
                    return isTargetPost ? { post: { ...item.post, commentCount: item.post.commentCount + 1 } } : item;
                }),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
}
