import type { NavigationContainerRefWithCurrent } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootRoutesParamList } from '<routes/root>';

const routes = {
    'notification/detail': 'posts/:postId/detail/:type',
    detail: 'users/:nickname',
} as const;

export function navigateLinking(
    navigation:
        | NavigationContainerRefWithCurrent<RootRoutesParamList>
        | NativeStackNavigationProp<RootRoutesParamList, 'my/notification-log'>,
    link: string,
) {
    const route = _findMatchingRoute(link);
    if (route === null) {
        return;
    }

    switch (route?.screen) {
        case 'notification/detail':
            navigation.navigate('share-post/modal', {
                screen: route.screen,
                params: {
                    postId: route.params?.postId ?? '',
                    type: (route.params?.type as 'like' | 'comment') ?? 'like',
                },
            });
            break;
        case 'detail':
            navigation.navigate('share-post/modal', {
                screen: route.screen,
                params: {
                    isFollow: false,
                    nickname: route.params?.nickname ?? '',
                    profile: {
                        src: '',
                    },
                    pageState: 'MODAL',
                },
            });
            break;
        default:
            break;
    }
}

function _findMatchingRoute(pattern: string) {
    const newPattern = pattern.replace('sharePost://', '');
    const routesArray = Object.entries(routes);

    for (const routeInfo of routesArray) {
        const [screen, route] = routeInfo as [keyof typeof routes, string];
        if (!_isPatternMatch(newPattern, route)) {
            continue;
        }

        const params = _extractParams(newPattern, route);
        const isNotExistParams = Object.keys(params).length === 0;
        if (isNotExistParams) {
            continue;
        }

        return { screen, params };
    }

    return null;
}

function _isPatternMatch(pattern: string, route: string) {
    const regexPattern = route.replace(/:\w+/g, '([^\\/]+)?');
    const regex = new RegExp(`^${regexPattern}$`);

    return regex.test(pattern);
}

function _extractParams(pattern: string, route: string) {
    const patternParts = pattern.split('/');
    const routeParts = route.split('/');

    const params: { [key in string]: string } = {};

    routeParts.forEach((routePart, index) => {
        const isParam = routePart.startsWith(':');
        if (!isParam) {
            return;
        }

        const paramName = routePart.substring(1);
        const paramValue = patternParts[index];
        params[paramName] = paramValue;
    });

    return params;
}
