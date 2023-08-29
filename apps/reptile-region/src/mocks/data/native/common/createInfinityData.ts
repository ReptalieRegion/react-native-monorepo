import { random } from 'lodash-es';

import type { InfiniteState } from '<InfiniteState>';

type CreateInfinityDataProps<ItemT> = {
    items: ItemT;
    searchParams: URLSearchParams;
    isRandomFinish?: boolean;
};

const createInfinityData = <ItemT>({
    searchParams,
    items,
    isRandomFinish = false,
}: CreateInfinityDataProps<ItemT>): InfiniteState<ItemT> => {
    const pageParam = searchParams.get('pageParam');
    const pageNumber = pageParam ? Number(pageParam) + 1 : 0;

    if (isRandomFinish) {
        const isFinishPage = pageNumber !== 1 && random(true) > 0.5;
        const nextPage = isFinishPage ? undefined : pageNumber;
        return { items, nextPage };
    }

    return { items, nextPage: pageNumber };
};

export default createInfinityData;
