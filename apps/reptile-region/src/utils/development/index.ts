import { S3_IMAGE_PREFIX } from '@/env/constants';

export const imageUriParsing = (uri: string) => {
    const replaceUri = uri.replace(S3_IMAGE_PREFIX, '');

    const newUri =
        replaceUri.startsWith('https') ||
        replaceUri.startsWith('files') ||
        replaceUri.startsWith('ph') ||
        replaceUri.startsWith('file') ||
        replaceUri.startsWith('/Users')
            ? replaceUri
            : S3_IMAGE_PREFIX + replaceUri;

    return newUri;
};
