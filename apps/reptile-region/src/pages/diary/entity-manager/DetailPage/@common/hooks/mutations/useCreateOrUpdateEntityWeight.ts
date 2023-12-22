import { Alert } from 'react-native';

import useBaseCreateEntityWeight from '@/apis/diary/entity-manager/hooks/mutations/useBaseCreateEntityWeight';
import useBaseUpdateEntityWeight from '@/apis/diary/entity-manager/hooks/mutations/useBaseUpdateEntityWeight';
import useToast from '@/components/overlay/Toast/useToast';

interface UseCreateOrUpdateEntityWeightActions {
    onSuccess(): void;
}

type UseCreateOrUpdateEntityWeightProps = UseCreateOrUpdateEntityWeightActions;

export default function useCreateOrUpdateEntityWeight({ onSuccess }: UseCreateOrUpdateEntityWeightProps) {
    const openToast = useToast();
    const updateEntityWeight = useBaseUpdateEntityWeight({
        onError: () => {
            openToast({ contents: '몸무게 수정에 실패했어요', severity: 'error' });
        },
        onSuccess,
    });

    const createEntityWeight = useBaseCreateEntityWeight({
        onError: (error, variables) => {
            if (error.statusCode === 417) {
                Alert.alert('해당 날짜에 이미 무게가 등록되어 있어요', '수정 하시겠어요?', [
                    {
                        text: '취소',
                        style: 'cancel',
                        onPress: () => {},
                    },
                    {
                        text: '수정',
                        onPress: () => updateEntityWeight.mutate(variables),
                    },
                ]);
            }
        },
        onSuccess,
    });

    return {
        ...createEntityWeight,
        isPending: createEntityWeight.isPending || updateEntityWeight.isPending,
    };
}
