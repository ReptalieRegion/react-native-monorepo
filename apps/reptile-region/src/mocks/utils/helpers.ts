export const wait = (ms: number = 3000) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
