import { Typo } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, type DimensionValue } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import KakaoSymbol from '@/assets/icons/KakaoSymbol';
import KakaoAuth from '@/native-modules/kakao-auth/KakaoAuth';
import type { KakaoProfile } from '@/native-modules/kakao-auth/type';

type KakaoButtonProps = {
    height?: DimensionValue;
    width?: DimensionValue;
    onSuccess(profile: KakaoProfile): void;
    onError(error: unknown): void;
};

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
        <TouchableWithoutFeedback style={[styles.kakaoContainer]} containerStyle={{ width, height }} onPress={handlePress}>
            <KakaoSymbol />
            <Typo>카카오 로그인</Typo>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    kakaoContainer: {
        backgroundColor: '#FEE500',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
    },
});
