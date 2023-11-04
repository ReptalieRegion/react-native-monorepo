declare module '<api/utils>' {
    /** Infinite 관련 시작 */
    interface InfiniteState<Item> {
        items: Item;
        nextPage: number | undefined;
    }

    type WithInfinitePageParam<Data> = Data extends void
        ? {
              pageParam: number;
          }
        : {
              pageParam: number;
          } & Data;
    /** Infinite 관련 끝 */

    /** react query option 관련 시작 */
    type EnableParam = {
        enabled: boolean;
    };

    type OnSuccessParam = {
        onSuccess: () => void;
    };
    /** react query option 관련 끝 */

    /** 서버 api 관련 시작 */
    type ServerAPI<Request, Response> = {
        Request: Request;
        Response: Response;
    };
    /** 서버 api 관련 시작 */
}
