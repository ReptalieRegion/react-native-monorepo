import clientFetch, { METHOD } from '@/apis/@utils/fetcher';

/** GET */
export const fetchMeProfile = async () => {
    const response = await clientFetch('api/users/me/profile', {
        method: METHOD.GET,
    });

    return response.json();
};
