import type { InfiniteState } from '@/types/apis/utils';

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
        const isFinishPage = pageNumber !== 1 && Math.random() > 0.5;
        const nextPage = isFinishPage ? undefined : pageNumber;
        return { items, nextPage };
    }

    return { items, nextPage: pageNumber };
};

export default createInfinityData;
