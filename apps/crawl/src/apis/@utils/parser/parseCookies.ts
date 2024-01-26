import { isEmpty } from 'lodash-es';

type ParseCookiesProps = {
    setCookieHeader: string | null;
    findCookie: string | string[];
};

export const parseCookies = ({ setCookieHeader, findCookie }: ParseCookiesProps) => {
    const cookies = setCookieHeader
        ?.split(',')
        .map((cookie) => cookie.split(';'))
        .flatMap((cookie) => cookie);

    if (cookies === undefined) {
        return undefined;
    }

    if (Array.isArray(findCookie)) {
        const cookiesMap = findCookie.reduce<{ [key: string]: string }>((prev, curr) => {
            const findKey = `${curr}=`;
            const newCookies = cookies
                .find((cookie) => cookie.trim().startsWith(findKey))
                ?.trim()
                .replace(findKey, '');
            return newCookies ? { ...prev, [curr]: newCookies } : { ...prev };
        }, {});

        return !isEmpty(cookiesMap) ? cookiesMap : undefined;
    }

    if (typeof findCookie === 'string') {
        const findKey = `${findCookie}=`;
        const newCookies = cookies
            .find((cookie) => cookie.trim().startsWith(findKey))
            ?.trim()
            .replace(findKey, '');
        return newCookies ? { [findCookie]: newCookies } : undefined;
    }

    return;
};
