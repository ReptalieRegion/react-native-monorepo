import { InfiniteData, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { createComment } from '../../repository';

import { SharePostListInfiniteData } from '<SharePostAPI>';
import type { CreateCommentRequest, CreateCommentResponse, SharePostCommentInfiniteData } from '<SharePostCommentAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const updateShareCommentListCache = ({
    queryClient,
    queryKey,
    data,
}: {
    queryClient: QueryClient;
    queryKey: string;
    data: Pick<CreateCommentResponse, 'comment' | 'user'>;
}) => {
    queryClient.setQueryData<InfiniteData<SharePostCommentInfiniteData>>(
        sharePostQueryKeys.comment(queryKey),
        (prevCommentList) => {
            if (prevCommentList === undefined) {
                return prevCommentList;
            }

            const updatePages = [...prevCommentList.pages];
            updatePages[0] = {
                nextPage: updatePages[0].nextPage,
                items: [data, ...updatePages[0].items],
            };

            return {
                ...prevCommentList,
                pages: updatePages,
            };
        },
    );
};

const updateSharePostListCache = ({ queryClient, queryKey }: { queryClient: QueryClient; queryKey: string }) => {
    queryClient.setQueryData<InfiniteData<SharePostListInfiniteData>>(sharePostQueryKeys.list, (prevPostListData) => {
        if (prevPostListData === undefined) {
            return prevPostListData;
        }

        const updatePages = [...prevPostListData.pages].map((page) => {
            const items = page.items.map((item) => {
                if (item.post.id === queryKey) {
                    return {
                        ...item,
                        post: {
                            ...item.post,
                            commentCount: item.post.commentCount + 1,
                        },
                    };
                }

                return item;
            });

            return {
                ...page,
                items,
            };
        });

        return {
            ...prevPostListData,
            pages: updatePages,
        };
    });
};

const useCreateComment = () => {
    const queryClient = useQueryClient();
    return useMutation<CreateCommentResponse, any, CreateCommentRequest>({
        mutationFn: ({ postId, contents }) => createComment({ postId, contents }),
        onSuccess: ({ comment, user, post }) => {
            updateShareCommentListCache({ queryClient, queryKey: post.id, data: { comment, user } });
            updateSharePostListCache({ queryClient, queryKey: post.id });
        },
    });
};

export default useCreateComment;
