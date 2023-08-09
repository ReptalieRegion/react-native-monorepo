import { InfiniteState } from '<InfiniteState>';

type CreateInfinityDataProps<ItemT> = {
    items: ItemT;
    searchParams: URLSearchParams;
};

const createInfinityData = <ItemT>({ searchParams, items }: CreateInfinityDataProps<ItemT>): InfiniteState<ItemT> => {
    const pageParam = searchParams.get('pageParam');

    return {
        items,
        nextPage: pageParam ? Number(pageParam) + 1 : 0,
    };
};

export default createInfinityData;
