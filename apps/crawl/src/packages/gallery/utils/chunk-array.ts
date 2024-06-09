export function chunkArray<Data>(array: Data[], size: number) {
    const result: Data[][] = [];

    for (let i = 0; i < array.length; i += size) {
        const chunk = array.slice(i, i + (i === 0 ? size - 1 : size));
        result.push(chunk);
    }

    return result;
}
