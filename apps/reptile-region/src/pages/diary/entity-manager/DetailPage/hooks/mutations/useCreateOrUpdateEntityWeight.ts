import useBaseCreateEntityWeight from '@/apis/diary/entity-manager/hooks/mutations/useBaseCreateEntityWeight';
import useBaseUpdateEntityWeight from '@/apis/diary/entity-manager/hooks/mutations/useBaseUpdateEntityWeight';
import useAlert from '@/components/overlay/Alert/useAlert';
import useToast from '@/components/overlay/Toast/useToast';

interface UseCreateOrUpdateEntityWeightActions {
    onSuccess(): void;
}

type UseCreateOrUpdateEntityWeightProps = UseCreateOrUpdateEntityWeightActions;

export default function useCreateOrUpdateEntityWeight({ onSuccess }: UseCreateOrUpdateEntityWeightProps) {
    const openToast = useToast();
    const openAlert = useAlert();
    const updateEntityWeight = useBaseUpdateEntityWeight({
        onError: () => {
            openToast({ contents: '몸무게 수정에 실패했어요', severity: 'error' });
        },
        onSuccess,
    });

    const createEntityWeight = useBaseCreateEntityWeight({
        onError: (error, variables) => {
            if (error.statusCode === 417) {
                openAlert({
                    title: '해당 날짜에 이미 무게가 등록되어 있어요',
                    contents: '수정 하시겠어요?',
                    buttons: [
                        {
                            text: '취소',
                            style: 'cancel',
                        },
                        {
                            text: '수정',
                            onPress: () => updateEntityWeight.mutate(variables),
                        },
                    ],
                });
            }
        },
        onSuccess,
    });

    return {
        ...createEntityWeight,
        isPending: createEntityWeight.isPending || updateEntityWeight.isPending,
    };
}
