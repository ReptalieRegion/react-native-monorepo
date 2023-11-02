import * as SecureStore from 'expo-secure-store';

type RegisterTokenProps = {
    accessToken: string;
    refreshToken: string;
};

const SECURE_STORE_KEYS = {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
} as const;

export const registerAuthTokens = async ({ accessToken, refreshToken }: RegisterTokenProps) => {
    await Promise.all([
        SecureStore.setItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN, accessToken),
        SecureStore.setItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN, refreshToken),
    ]);
};

export const deleteAuthTokens = async () => {
    await Promise.all([
        SecureStore.deleteItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN),
        SecureStore.deleteItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN),
    ]);
};

export const getAccessToken = async () => {
    return await SecureStore.getItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN);
};

export const getRefreshToken = async () => {
    return await SecureStore.getItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN);
};
