import appleAuth, { AppleButton as RNAppleButton } from '@invertase/react-native-apple-authentication';
import React from 'react';
import { type DimensionValue } from 'react-native';

type AppleButtonState = {
    height?: DimensionValue;
    width?: DimensionValue;
};

interface AppleButtonActions {
    onSuccess(): void;
    onError(error: unknown): void;
}

export type AppleButtonProps = AppleButtonState & AppleButtonActions;

export default function AppleButton({ width = '90%', height = 44, onError }: AppleButtonProps) {
    const handlePress = async () => {
        try {
            const responseObject = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
            });

            const credentialState = await appleAuth.getCredentialStateForUser(responseObject.user);
            if (credentialState === appleAuth.State.AUTHORIZED) {
                console.log('user is authenticated');
            }
        } catch (error) {
            onError(error);
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