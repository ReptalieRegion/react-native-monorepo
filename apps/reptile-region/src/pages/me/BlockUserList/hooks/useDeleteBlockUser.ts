import { useQueryClient, type InfiniteData } from '@tanstack/react-query';

import { REPORT_QUERY_KEYS } from '@/apis/@utils/query-keys';
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
        onError: () => {
            openToast({ contents: '차단 해제에 실패했어요.', severity: 'error' });
        },
    });
}
