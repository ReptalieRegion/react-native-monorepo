import { Typo } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View, type DimensionValue } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import useKakaoAuth from '../../hooks/mutations/useKakaoAuth';

import useAuthTokenAndPublicKey from '@/apis/auth/hooks/mutations/useAuthTokenAndPublicKey';
import KakaoSymbol from '@/assets/icons/KakaoSymbol';
import useGlobalLoading from '@/components/@common/organisms/Loading/useGlobalLoading';
import KakaoAuth from '@/native-modules/kakao-auth/KakaoAuth';

type KakaoButtonState = {
    height?: DimensionValue;
    width?: DimensionValue;
};

interface KakaoButtonActions {
    onError(error: unknown): void;
}

export type KakaoButtonProps = KakaoButtonState & KakaoButtonActions;

export default function KakaoButton({ height = 44, width = '90%', onError }: KakaoButtonProps) {
    const { openLoading, closeLoading } = useGlobalLoading();
    const { mutateAsync: AuthTokenAndPublicKeyMutateAsync } = useAuthTokenAndPublicKey();
    const { mutate: kakaoAuthMutate } = useKakaoAuth();

    const handlePress = async () => {
        try {
            openLoading();
            await KakaoAuth.login();
            const profile = await KakaoAuth.getProfile();
            const { authToken, publicKey } = await AuthTokenAndPublicKeyMutateAsync();
            kakaoAuthMutate({ socialId: profile.id, authToken, publicKey });
        } catch (error) {
            onError(error);
        } finally {
            closeLoading();
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
