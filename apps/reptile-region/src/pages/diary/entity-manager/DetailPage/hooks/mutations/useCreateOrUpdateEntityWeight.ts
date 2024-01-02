import useUpdateEntityWeight from './useUpdateEntityWeight';

import useBaseCreateEntityWeight from '@/apis/diary/entity-manager/hooks/mutations/useBaseCreateEntityWeight';
import useAlert from '@/components/overlay/Alert/useAlert';

interface UseCreateOrUpdateEntityWeightActions {
    onSuccess(): void;
}

type UseCreateOrUpdateEntityWeightProps = UseCreateOrUpdateEntityWeightActions;

export default function useCreateOrUpdateEntityWeight({ onSuccess }: UseCreateOrUpdateEntityWeightProps) {
    const openAlert = useAlert();
    const updateEntityWeight = useUpdateEntityWeight({ onSuccess });

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
