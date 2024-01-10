import appleAuth, { AppleError, AppleButton as RNAppleButton } from '@invertase/react-native-apple-authentication';
import React from 'react';
import { type DimensionValue } from 'react-native';

import useAppleAuth from '../../hooks/mutations/useAppleAuth';

import useAuthTokenAndPublicKey from '@/apis/auth/hooks/mutations/useAuthTokenAndPublicKey';
import useGlobalLoading from '@/components/@common/organisms/Loading/useGlobalLoading';

type AppleButtonState = {
    height?: DimensionValue;
    width?: DimensionValue;
};

interface AppleButtonActions {
    onError(error: unknown): void;
}

export type AppleButtonProps = AppleButtonState & AppleButtonActions;

export default function AppleButton({ width = '90%', height = 44, onError }: AppleButtonProps) {
    const { mutateAsync: AuthTokenAndPublicKeyMutateAsync } = useAuthTokenAndPublicKey();
    const { mutate: appleMutate } = useAppleAuth();
    const { openLoading, closeLoading } = useGlobalLoading();

    const handlePress = async () => {
        try {
            openLoading();
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });

            if (!appleAuthRequestResponse.identityToken) {
                throw new Error('[Apple Sign In]: no identify token returned');
            }

            const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
            if (credentialState === appleAuth.State.AUTHORIZED) {
                const { authToken, publicKey } = await AuthTokenAndPublicKeyMutateAsync();
                appleMutate({ authToken, publicKey, socialId: appleAuthRequestResponse.user });
            }
        } catch (error: any) {
            if (error.code === !AppleError.CANCELED) {
                onError(error);
            }
        } finally {
            closeLoading();
        }
    };

    return (
        <RNAppleButton
            buttonStyle={RNAppleButton.Style.BLACK}
            buttonType={RNAppleButton.Type.CONTINUE}
            style={{ width, height }}
            cornerRadius={12}
            onPress={handlePress}
        />
    );
}
