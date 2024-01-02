import useBaseUpdateEntityWeight from '@/apis/diary/entity-manager/hooks/mutations/useBaseUpdateEntityWeight';
import useToast from '@/components/overlay/Toast/useToast';

type UseUpdateEntityWeightProps = {
    onSuccess(): void;
};

export default function useUpdateEntityWeight({ onSuccess }: UseUpdateEntityWeightProps) {
    const openToast = useToast();
    return useBaseUpdateEntityWeight({
        onError: () => {
            openToast({ contents: '몸무게 수정에 실패했어요', severity: 'error' });
        },
        onSuccess,
    });
}
