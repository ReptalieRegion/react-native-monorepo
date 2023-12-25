import * as SecureStore from 'expo-secure-store';

type RegisterTokenProps = {
    accessToken: string;
    refreshToken: string;
};

const SECURE_STORE_KEYS = {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
} as const;

const registerAuthTokens = async ({ accessToken, refreshToken }: RegisterTokenProps) => {
    if (!!accessToken && !!refreshToken) {
        await Promise.all([
            SecureStore.setItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN, accessToken),
            SecureStore.setItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN, refreshToken),
        ]);
        return;
    }

    throw new Error('[registerAuthTokens]: accessToken과 refreshToken이 없습니다.');
};

const deleteAuthTokens = async () => {
    await Promise.all([
        SecureStore.deleteItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN),
        SecureStore.deleteItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN),
    ]);
};

const getAccessToken = async () => {
    return await SecureStore.getItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN);
};

const getRefreshToken = async () => {
    return await SecureStore.getItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN);
};

export { deleteAuthTokens, getAccessToken, getRefreshToken, registerAuthTokens };
