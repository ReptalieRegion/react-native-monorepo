import { S3_IMAGE_PREFIX } from '@/env/constants';

export const imageUriParsing = (uri: string) => {
    if (__DEV__) {
        const replaceUri = uri.replace(S3_IMAGE_PREFIX, '');

        const newUri =
            replaceUri.startsWith('https') || replaceUri.startsWith('files') || replaceUri.startsWith('ph')
                ? replaceUri
                : S3_IMAGE_PREFIX + replaceUri;

        return newUri;
    }

    return uri;
};