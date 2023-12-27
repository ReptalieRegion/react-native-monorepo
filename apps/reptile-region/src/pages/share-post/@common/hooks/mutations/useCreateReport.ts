import { useBottomSheet } from '@crawl/bottom-sheet';

import useBaseCreateReport from '@/apis/report/mutations/useBaseCreateReport';

export default function useCreateReport() {
    const { bottomSheetClose } = useBottomSheet();

    /**
     * TODO 캐시 업데이트 로직 필요, 게시글, 댓글, 대댓글 분기 처리
     */
    return useBaseCreateReport({
        onSettled: bottomSheetClose,
    });
}
