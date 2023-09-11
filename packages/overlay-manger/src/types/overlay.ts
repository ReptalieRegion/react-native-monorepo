import React from 'react';

export type ParamListBase = Record<string, object | undefined>;

export type OverlayParams<ParamList extends ParamListBase, RouteName extends keyof ParamList> = ParamList[RouteName];

export type ScreenComponentType<ParamList extends ParamListBase, RouteName extends keyof ParamList> = (
    params: ParamList[RouteName],
) => React.JSX.Element;

export type OverlayComponents<ParamList extends ParamListBase, RouteName extends keyof ParamList = keyof ParamList> = {
    [Name in RouteName]?: ScreenComponentType<ParamList, Name>;
};

export type OverlayProp<ParamList extends ParamListBase, RouteName extends keyof ParamList> = {
    openOverlay(
        options: RouteName extends unknown
            ? ParamList[RouteName] extends undefined
                ? { name: RouteName; params?: ParamList[RouteName] }
                : { name: RouteName; params: ParamList[RouteName] }
            : never,
    ): void;
    closeOverlay(name: RouteName): void;
    registerOverlay(
        options: RouteName extends unknown ? { name: RouteName; component: ScreenComponentType<ParamList, RouteName> } : never,
    ): void;
};

/** reducer 관련 타입 */
interface OverlayOpen<ParamList extends ParamListBase, RouteName extends keyof ParamList> {
    type: 'OPEN';
    name: RouteName;
    params?: ParamList[RouteName];
}

interface OverlayClose<ParamList extends ParamListBase, RouteName extends keyof ParamList> {
    type: 'CLOSE';
    name: RouteName;
}

interface OverlayRegister<ParamList extends ParamListBase, RouteName extends keyof ParamList> {
    type: 'REGISTER';
    name: RouteName;
    component: ScreenComponentType<ParamList, RouteName>;
}

interface OverlayInitRegister<ParamList extends ParamListBase, RouteName extends keyof ParamList> {
    type: 'INIT_REGISTER';
    component: OverlayComponents<ParamList, RouteName>;
}

export type OverlayActions<ParamList extends {}, RouteName extends keyof ParamList> =
    | OverlayOpen<ParamList, RouteName>
    | OverlayClose<ParamList, RouteName>
    | OverlayRegister<ParamList, RouteName>
    | OverlayInitRegister<ParamList, RouteName>;

export type OverlayState<ParamList extends ParamListBase, RouteName extends keyof ParamList> = {
    component: OverlayComponents<ParamList, RouteName>;
    openList: {
        name: RouteName;
        params?: ParamList[RouteName];
    }[];
};

export type OverlayReducer<ParamList extends ParamListBase, RouteName extends keyof ParamList> = (
    state: OverlayState<ParamList, RouteName>,
    actions: OverlayActions<ParamList, RouteName>,
) => OverlayState<ParamList, RouteName>;

export type OpenOverlayHost = <ParamList extends ParamListBase, RouteName extends keyof ParamList>(props: {
    state: OverlayState<ParamList, RouteName>;
    name: RouteName;
    params?: ParamList[RouteName];
}) => OverlayState<ParamList, RouteName>;

export type CloseOverlayHost = <ParamList extends ParamListBase, RouteName extends keyof ParamList>(props: {
    state: OverlayState<ParamList, RouteName>;
    name: RouteName;
}) => OverlayState<ParamList, RouteName>;

export type RegisterOverlayHost = <ParamList extends ParamListBase, RouteName extends keyof ParamList>(props: {
    state: OverlayState<ParamList, RouteName>;
    name: RouteName;
    component: ScreenComponentType<ParamList, RouteName>;
}) => OverlayState<ParamList, RouteName>;

export type InitRegisterOverlayHost = <ParamList extends ParamListBase, RouteName extends keyof ParamList>(props: {
    state: OverlayState<ParamList, RouteName>;
    components: OverlayComponents<ParamList, RouteName>;
}) => OverlayState<ParamList, RouteName>;
