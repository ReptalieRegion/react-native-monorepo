import { InfiniteData, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteComment } from '../../repository';

import { SharePostListInfiniteData } from '<SharePostAPI>';
import type { DeleteCommentRequest, DeleteCommentResponse, SharePostCommentInfiniteData } from '<SharePostCommentAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

// Cache Update: 일상공유 무한스크롤 조회 리스트
const updateSharePostListCache = ({
    queryClient,
    post,
}: {
    queryClient: QueryClient;
    post: Pick<DeleteCommentResponse['post'], 'id'>;
}) => {
    queryClient.setQueryData<InfiniteData<SharePostListInfiniteData>>(sharePostQueryKeys.list, (prevSharePostListData) => {
        if (prevSharePostListData === undefined) {
            return undefined;
        }

        const updatePages = [...prevSharePostListData.pages].map((page) => {
            const items = page.items.map((item) => {
                if (item.post.id === post.id) {
                    return {
                        ...item,
                        post: {
                            ...item.post,
                            commentCount: item.post.commentCount - 1,
                        },
                    };
                }

                return item;
            });

            return { ...page, items };
        });

        return {
            ...prevSharePostListData,
            pages: updatePages,
        };
    });
};

// Cache Update: 특정 게시글 댓글 리스트 무한 스크롤
const deleteCommentCache = ({ queryClient, data }: { queryClient: QueryClient; data: DeleteCommentResponse }) => {
    queryClient.setQueryData<InfiniteData<SharePostCommentInfiniteData>>(
        sharePostQueryKeys.comment(data.post.id),
        (prevComments) => {
            if (prevComments === undefined) {
                return prevComments;
            }

            const updatePages = [...prevComments.pages].map((page) => {
                const items = page.items.filter((item) => item.comment.id !== data.comment.id);

                return { ...page, items };
            });

            return {
                ...prevComments,
                pages: updatePages,
            };
        },
    );
};

const useDeleteComment = () => {
    const queryClient = useQueryClient();
    return useMutation<DeleteCommentResponse, any, DeleteCommentRequest>({
        mutationFn: ({ commentId }) => deleteComment({ commentId }),
        onSuccess: (data) => {
            deleteCommentCache({ queryClient, data });
            updateSharePostListCache({ queryClient, post: data.post });
        },
    });
};

export default useDeleteComment;
