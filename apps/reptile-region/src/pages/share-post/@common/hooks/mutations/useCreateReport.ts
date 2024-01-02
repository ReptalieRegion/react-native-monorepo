import { useBottomSheet } from '@crawl/bottom-sheet';
import { useQueryClient } from '@tanstack/react-query';

import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseCreateReport from '@/apis/report/mutations/useBaseCreateReport';

export default function useCreateReport() {
    const queryClient = useQueryClient();
    const { bottomSheetClose } = useBottomSheet();

    /**
     * TODO 캐시 업데이트 로직 필요, 게시글, 댓글, 대댓글 분기 처리
     */
    return useBaseCreateReport({
        onSettled: bottomSheetClose,
        onSuccess: (_data, variables) => {
            switch (variables.type) {
                case '게시글':
                    queryClient.invalidateQueries({ queryKey: SHARE_POST_QUERY_KEYS.list, exact: true });
                    queryClient.invalidateQueries({
                        queryKey: SHARE_POST_QUERY_KEYS.detailUserPosts(variables.nickname),
                        exact: true,
                    });
                    return;
                case '댓글':
                    queryClient.invalidateQueries({ queryKey: SHARE_POST_QUERY_KEYS.comment(variables.postId), exact: true });
                    return;
                case '대댓글':
                    queryClient.invalidateQueries({
                        queryKey: SHARE_POST_QUERY_KEYS.commentReply(variables.commentId),
                        exact: true,
                    });
                    return;
            }
        },
    });
}
