import { Typo, color } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import useGoogleAuth from '@/apis/auth/hooks/mutations/useGoogleAuth';
import GoogleSymbol from '@/assets/icons/GoogleSymbol';
import useGlobalLoading from '@/components/@common/organisms/Loading/useGlobalLoading';
import { GoogleAuth } from '@/native-modules/google-auth/RNGoogleAuthModule';
import type { PostGoogleAuth } from '@/types/apis/auth';

interface GoogleButtonActions {
    onSuccess(props: PostGoogleAuth['Response']): void;
    onError(error: unknown): void;
}

export type GoogleButtonProps = GoogleButtonActions;

export default function GoogleButton({ onSuccess, onError }: GoogleButtonProps) {
    const { openLoading, closeLoading } = useGlobalLoading();
    const { mutate } = useGoogleAuth({ onSuccess, onError });

    const handlePress = async () => {
        try {
            openLoading();
            const result = await GoogleAuth.login();
            if (result.idToken === null) {
                throw new Error('[Google Auth]: no idToken');
            }
            mutate({ idToken: result.idToken });
        } catch (error) {
            onError(error);
        } finally {
            closeLoading();
        }
    };

    return (
        <TouchableWithoutFeedback
            onPress={handlePress}
            style={[styles.fullWidth, styles.center]}
            containerStyle={styles.fullWidth}
        >
            <View style={styles.container}>
                <GoogleSymbol />
                <Typo fontFamily={Typo.FontFamilyOnlyAndroid['Roboto-Medium']}>Google계정으로 로그인</Typo>
                <View style={styles.empty} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    fullWidth: {
        width: '100%',
    },
    center: {
        alignItems: 'center',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        gap: 24,
        height: 44,
        width: '90%',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: color.Gray[550].toString(),
    },
    empty: {
        width: 20,
        height: 20,
    },
});