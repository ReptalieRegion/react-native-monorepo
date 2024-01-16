import useBaseDeleteBlockUser from '@/apis/report/mutations/useBaseDeleteBlockUser';
import useToast from '@/components/overlay/Toast/useToast';

export default function useDeleteBlockUser() {
    const openToast = useToast();
    return useBaseDeleteBlockUser({
        onError: () => {
            openToast({ contents: '차단 해제에 실패했어요.', severity: 'error' });
        },
    });
}
