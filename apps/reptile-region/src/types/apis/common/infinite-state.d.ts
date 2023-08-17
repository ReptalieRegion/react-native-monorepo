declare module '<InfiniteState>' {
    interface InfiniteState<Item> {
        items: Item;
        nextPage: number | undefined;
    }
}
