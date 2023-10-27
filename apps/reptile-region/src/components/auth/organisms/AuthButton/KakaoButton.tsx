import { Typo } from '@reptile-region/design-system';
import forge from 'node-forge';
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
            const data = { socialId: profile.id };
            const publicKey =
                '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzjbgBgx5wZChFwOx1m8x\nv7tHceZ8jsar+INkCgB8ued+dBnU+rSmoR01rlIrjvvIO0+7b29d51QYPT3//cxr\nWcygiDNTfP5Pmtb9YYpolJe/h7+l0LHsfznCi1feJeuFucx4w04mw6Ky2FItY0EE\nF8hDTmmyBlMFKG7VKibB8+jzVJlErDvq1W8lqxci75f34thc+vPheGYUyJ2wN7hn\n2c679UPILpzeaIE4VOOu2phYVrALWCoPnXmP+Cwm368IUG5f+AD+ATTGyEMufX8q\nLcwpi85WJQhG5hEDwgF+OOZPyDfalZtpxdNTLGJuMwrdofqIE1t2jtGHnPHnxPEK\nbQIDAQAB\n-----END PUBLIC KEY-----\n';
            const publicKeyPem = forge.pki.publicKeyFromPem(publicKey);
            const encryptedData = publicKeyPem.encrypt(JSON.stringify(data), 'RSA-OAEP');
            const base64Encoded = forge.util.encode64(encryptedData);

            console.log(base64Encoded);

            onSuccess(profile);
        } catch (error) {
            console.log(error);
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
