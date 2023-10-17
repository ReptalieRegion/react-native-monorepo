import React from 'react';

export type ParamListBase = Record<string, object | undefined>;

export type OverlayParams<ParamList extends ParamListBase, RouteName extends keyof ParamList> = ParamList[RouteName];

export type ScreenComponentType<ParamList extends ParamListBase, RouteName extends keyof ParamList> = (
    params: ParamList[RouteName],
) => React.JSX.Element;

export type OverlayComponents<ParamList extends ParamListBase, RouteName extends keyof ParamList = keyof ParamList> = {
    [Name in RouteName]?: ScreenComponentType<ParamList, Name>;
};

export type OverlayProp<ParamList extends ParamListBase> = {
    openOverlay<RouteName extends keyof ParamList>(name: RouteName, params: ParamList[RouteName]): void;
    closeOverlay<RouteName extends keyof ParamList>(name: RouteName): void;
    registerOverlay<RouteName extends keyof ParamList>(
        name: RouteName,
        option: {
            component: ScreenComponentType<ParamList, RouteName>;
        },
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

interface OverlayResetOpenList {
    type: 'RESET_OPEN_LIST';
}

export type OverlayActions<ParamList extends {}, RouteName extends keyof ParamList> =
    | OverlayOpen<ParamList, RouteName>
    | OverlayClose<ParamList, RouteName>
    | OverlayRegister<ParamList, RouteName>
    | OverlayInitRegister<ParamList, RouteName>
    | OverlayResetOpenList;

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

export type ResetOpenListOverlayHost = <ParamList extends ParamListBase, RouteName extends keyof ParamList>(props: {
    state: OverlayState<ParamList, RouteName>;
}) => OverlayState<ParamList, RouteName>;
