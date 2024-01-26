import { useCallback } from 'react';

import useAlert from '../../../../components/overlay/Alert/useAlert';

import useCreateBlockUser from './mutations/useCreateBlockUser';

interface UseBlockAlertActions {
    onSuccess?(): void;
}

export default function useBlockAlert(props?: UseBlockAlertActions) {
    const { mutate } = useCreateBlockUser(props);
    const openAlert = useAlert();

    return useCallback(
        (nickname: string) => {
            openAlert({
                title: '차단하시겠습니까?',
                contents: '해당 유저가 작성한 글이 보이지 않으며 차단된 유저와 관련 된 알림도 발송되지 않습니다.',
                buttons: [
                    {
                        text: '취소',
                        style: 'cancel',
                    },
                    {
                        text: '확인',
                        onPress: () => {
                            mutate({ nickname });
                        },
                    },
                ],
            });
        },
        [mutate, openAlert],
    );
}
