import { Typo } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View, type DimensionValue } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import type { PostKakaoAuth } from '<api/auth>';
import { useKakaoAuth } from '@/apis/auth';
import useAuthTokenAndPublicKey from '@/apis/auth/hooks/mutations/useAuthTokenAndPublicKey';
import KakaoSymbol from '@/assets/icons/KakaoSymbol';
import KakaoAuth from '@/native-modules/kakao-auth/KakaoAuth';

type KakaoButtonState = {
    height?: DimensionValue;
    width?: DimensionValue;
};

interface KakaoButtonActions {
    onSuccess(data: PostKakaoAuth['Response']): void;
    onError(error: unknown): void;
}

export type KakaoButtonProps = KakaoButtonState & KakaoButtonActions;

export default function KakaoButton({ height = 44, width = '90%', onSuccess, onError }: KakaoButtonProps) {
    const { mutateAsync: AuthTokenAndPublicKeyMutateAsync } = useAuthTokenAndPublicKey();
    const { mutateAsync: kakaoAuthMutateAsync } = useKakaoAuth({ onSuccess, onError });

    const handlePress = async () => {
        try {
            await KakaoAuth.login();
            const profile = await KakaoAuth.getProfile();
            const { authToken, publicKey } = await AuthTokenAndPublicKeyMutateAsync();
            const data = await kakaoAuthMutateAsync({ socialId: profile.id, authToken, publicKey });
            onSuccess(data);
        } catch (error) {
            onError(error);
        }
    };

    return (
        <TouchableWithoutFeedback style={styles.wrapper} containerStyle={styles.wrapperContainer} onPress={handlePress}>
            <View style={[styles.kakaoContainer, { width, height }]}>
                <KakaoSymbol />
                <Typo>카카오로 계속하기</Typo>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
    },
    wrapperContainer: {
        width: '100%',
    },
    kakaoContainer: {
        backgroundColor: '#FEE500',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
});
