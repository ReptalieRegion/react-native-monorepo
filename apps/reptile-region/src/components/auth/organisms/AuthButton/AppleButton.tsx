import appleAuth, { AppleError, AppleButton as RNAppleButton } from '@invertase/react-native-apple-authentication';
import React from 'react';
import { type DimensionValue } from 'react-native';

import type { PostAppleAuth } from '<api/auth>';
import { useAppleAuth } from '@/apis/auth';
import useAuthTokenAndPublicKey from '@/apis/auth/hooks/mutations/useAuthTokenAndPublicKey';

type AppleButtonState = {
    height?: DimensionValue;
    width?: DimensionValue;
};

interface AppleButtonActions {
    onSuccess(props: PostAppleAuth['Response']): void;
    onError(error: unknown): void;
}

export type AppleButtonProps = AppleButtonState & AppleButtonActions;

export default function AppleButton({ width = '90%', height = 44, onSuccess, onError }: AppleButtonProps) {
    const { mutateAsync: AuthTokenAndPublicKeyMutateAsync } = useAuthTokenAndPublicKey();
    const { mutate: appleMutate } = useAppleAuth({ onSuccess, onError });

    const handlePress = async () => {
        try {
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
