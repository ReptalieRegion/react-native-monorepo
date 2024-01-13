import clientFetch, { METHOD } from '../@utils/fetcher';

import type { CreateReport } from '@/types/apis/report';

export const createReport = async ({ details, reported, type, typeId }: CreateReport['Request']) => {
    const response = await clientFetch('api/report/register', {
        method: METHOD.POST,
        body: {
            details,
            reported,
            type,
            typeId,
        },
    });

    return response.json();
};
