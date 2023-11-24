import forge from 'node-forge';

const _stringifyData = (data: unknown) => {
    if (typeof data === 'string') {
        return data;
    }

    return JSON.stringify(data);
};

/**
 *
 * @param publicKey string
 * @param data unknown
 */
export const encryptionRSA = (publicKey: string, data: unknown) => {
    const newData = _stringifyData(data);
    const publicKeyPem = forge.pki.publicKeyFromPem(publicKey);
    const encryptedData = publicKeyPem.encrypt(newData, 'RSA-OAEP');
    const base64Encoded = forge.util.encode64(encryptedData);

    return base64Encoded;
};
