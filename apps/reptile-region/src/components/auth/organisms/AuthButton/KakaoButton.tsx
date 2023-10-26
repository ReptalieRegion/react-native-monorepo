import { Typo } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View, type DimensionValue } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import KakaoSymbol from '@/assets/icons/KakaoSymbol';
import KakaoAuth from '@/native-modules/kakao-auth/KakaoAuth';
import type { KakaoProfile } from '@/native-modules/kakao-auth/type';

type KakaoButtonState = {
    height?: DimensionValue;
    width?: DimensionValue;
};

interface KakaoButtonActions {
    onSuccess(profile: KakaoProfile): void;
    onError(error: unknown): void;
}

export type KakaoButtonProps = KakaoButtonState & KakaoButtonActions;

export default function KakaoButton({ height = 44, width = '90%', onSuccess, onError }: KakaoButtonProps) {
    const handlePress = async () => {
        try {
            await KakaoAuth.login();
            const profile = await KakaoAuth.getProfile();
            onSuccess(profile);
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
