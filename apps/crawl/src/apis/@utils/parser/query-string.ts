export const objectToQueryString = (params: { [key: string]: string | number | boolean | undefined | string[] }) => {
    const queryString = Object.entries(params)
        .map(([key, value]) => {
            if (value === undefined) {
                return undefined;
            }

            if (Array.isArray(value)) {
                return `${encodeURIComponent(key)}=[${value.map(encodeURIComponent).join(',')}]`;
            }

            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        })
        .filter((value) => value !== undefined)
        .join('&');
    return queryString;
};
