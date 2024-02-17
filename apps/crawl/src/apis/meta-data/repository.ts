import clientFetch, { METHOD } from '../@utils/fetcher';

/** GET */
// 원격 구성 조회
export const getRemoteConfig = async () => {
    const result = await clientFetch('api/metadata/remote-config', {
        method: METHOD.GET,
    });

    return result.json();
};
