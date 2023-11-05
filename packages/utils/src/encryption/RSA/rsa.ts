import forge from 'node-forge';

/**
 *
 * @param publicKey string
 * @param data unknown
 */
export const encryptionRSA = (publicKey: string, data: unknown) => {
    const publicKeyPem = forge.pki.publicKeyFromPem(publicKey);
    const encryptedData = publicKeyPem.encrypt(JSON.stringify(data), 'RSA-OAEP');
    const base64Encoded = forge.util.encode64(encryptedData);

    return base64Encoded;
};
