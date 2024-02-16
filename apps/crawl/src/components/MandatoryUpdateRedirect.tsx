import { useEffect } from 'react';
import { Linking, Platform } from 'react-native';

import useAlert from './overlay/Alert/useAlert';

export default function MandatoryUpdateRedirect() {
    const openAlert = useAlert(true);

    useEffect(() => {
        openAlert({
            title: '최신 버전 업데이트',
            contents: '안정적인 서비스 사용을 위해 최신버전으로 업데이트 해주세요.',
            isBackdropClosable: false,
            buttons: [
                {
                    text: '업데이트',
                    style: 'default',
                    onPress: () => {
                        Linking.openURL(
                            Platform.select({
                                ios: 'https://apps.apple.com/kr/app/%ED%81%AC%EB%A1%A4/id6469619957',
                                android: '',
                                default: 'https://apps.apple.com/kr/app/%ED%81%AC%EB%A1%A4/id6469619957',
                            }),
                        );
                    },
                },
            ],
        });
    }, [openAlert]);

    return null;
}
