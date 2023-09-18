declare module '<HookForm>' {
    type UseFormDefaultValues<Union> = {
        [key in Union]: string;
    };
}
