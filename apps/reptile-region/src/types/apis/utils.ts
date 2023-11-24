// 무한 스크롤
interface InfiniteState<Item> {
    items: Item;
    nextPage: number | undefined;
}

// 무한 스크롤 pageParm
type WithInfinitePageParam<Data> = Data extends void
    ? {
          pageParam: number;
      }
    : {
          pageParam: number;
      } & Data;

// 서버 API
type ServerAPI<Request, Response> = {
    Request: Request;
    Response: Response;
};

export type { InfiniteState, ServerAPI, WithInfinitePageParam };
