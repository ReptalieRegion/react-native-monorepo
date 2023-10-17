export const objectToQueryString = (params: { [key: string]: string | number | boolean | undefined }) => {
    const queryString = Object.entries(params)
        .map(([key, value]) => {
            if (value === undefined) {
                return undefined;
            }

            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        })
        .filter((value) => value !== undefined)
        .join('&');
    return queryString;
};
