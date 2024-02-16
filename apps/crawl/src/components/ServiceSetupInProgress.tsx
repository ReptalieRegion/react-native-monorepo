import { useEffect } from 'react';

import useAlert from './overlay/Alert/useAlert';

export default function ServiceSetupInProgress() {
    const openAlert = useAlert(true);

    useEffect(() => {
        openAlert({
            title: '서비스 준비 중',
            contents: '현재 서비스 점검 중 입니다. 조금만 기다려주세요 :)',
            isBackdropClosable: false,
            buttons: [],
        });
    }, [openAlert]);

    return null;
}
