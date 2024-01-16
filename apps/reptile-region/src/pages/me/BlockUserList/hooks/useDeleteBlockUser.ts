import { useQueryClient, type InfiniteData } from '@tanstack/react-query';

import { REPORT_QUERY_KEYS, SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseDeleteBlockUser from '@/apis/report/mutations/useBaseDeleteBlockUser';
import useToast from '@/components/overlay/Toast/useToast';
import type { FetchBlockUserListResponse } from '@/types/apis/report/block-user';
import type { InfiniteState } from '@/types/apis/utils';

type Context = {
    prevBlockUserList: InfiniteData<InfiniteState<FetchBlockUserListResponse[]>, number> | undefined;
};

export default function useDeleteBlockUser() {
    const queryClient = useQueryClient();
    const openToast = useToast();

    return useBaseDeleteBlockUser<Context>({
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: REPORT_QUERY_KEYS.blockUser });
            const prevBlockUserList = queryClient.getQueryData<
                InfiniteData<InfiniteState<FetchBlockUserListResponse[]>, number>
            >(REPORT_QUERY_KEYS.blockUser);

            queryClient.setQueryData<InfiniteData<InfiniteState<FetchBlockUserListResponse[]>, number>>(
                REPORT_QUERY_KEYS.blockUser,
                (prevData) => {
                    if (prevData === undefined) {
                        return prevData;
                    }

                    const { pageParams, pages } = prevData;

                    const updatedPages = pages.map((page) => {
                        const { items, nextPage } = page;

                        return {
                            nextPage,
                            items: items.filter((value) => value.blocking.id !== variables.blockingId),
                        };
                    });

                    return {
                        pageParams,
                        pages: updatedPages,
                    };
                },
            );

            return { prevBlockUserList };
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: SHARE_POST_QUERY_KEYS.list, exact: true });
            queryClient.invalidateQueries({ queryKey: SHARE_POST_QUERY_KEYS.profileDetail(variables.nickname), exact: true });
            queryClient.invalidateQueries({ queryKey: SHARE_POST_QUERY_KEYS.detailUserPosts(variables.nickname), exact: true });
            queryClient.invalidateQueries({ queryKey: SHARE_POST_QUERY_KEYS.defaultComment });
            queryClient.invalidateQueries({ queryKey: SHARE_POST_QUERY_KEYS.defaultCommentReply });
        },
        onError: (_error, _variables, context) => {
            openToast({ contents: '차단 해제에 실패했어요.', severity: 'error' });
            if (context?.prevBlockUserList) {
                queryClient.setQueryData(REPORT_QUERY_KEYS.blockUser, context.prevBlockUserList);
            }
        },
    });
}
