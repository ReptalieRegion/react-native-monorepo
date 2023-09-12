import {
    CloseOverlayHost,
    InitRegisterOverlayHost,
    OpenOverlayHost,
    OverlayActions,
    OverlayState,
    ParamListBase,
    RegisterOverlayHost,
    ResetOpenListOverlayHost,
} from '../types/overlay';

const openOverlayHost: OpenOverlayHost = ({ state, name, params }) => {
    const cloneState = { ...state };
    cloneState.openList.push({ name, params });

    return cloneState;
};

const closeOverlayHost: CloseOverlayHost = ({ state, name }) => {
    const cloneState = { ...state };
    cloneState.openList = cloneState.openList.filter((openInfo) => openInfo.name !== name);

    return cloneState;
};

const registerOverlayHost: RegisterOverlayHost = ({ state, name, component }) => {
    const cloneState = { ...state };
    cloneState.component[name] = component;

    return cloneState;
};

const initRegisterOverlayHost: InitRegisterOverlayHost = ({ state, components }) => {
    const cloneState = { ...state };
    cloneState.component = components;

    return cloneState;
};

const resetOpenListOverlayHost: ResetOpenListOverlayHost = ({ state }) => {
    const cloneState = { ...state };
    cloneState.openList = [];

    return cloneState;
};

const reducer = <ParamList extends ParamListBase, RouteName extends keyof ParamList>(
    state: OverlayState<ParamList, RouteName>,
    actions: OverlayActions<ParamList, RouteName>,
) => {
    switch (actions.type) {
        case 'OPEN':
            return openOverlayHost<ParamList, RouteName>({ state, name: actions.name, params: actions.params });
        case 'CLOSE':
            return closeOverlayHost<ParamList, RouteName>({ state, name: actions.name });
        case 'REGISTER':
            return registerOverlayHost<ParamList, RouteName>({ state, name: actions.name, component: actions.component });
        case 'INIT_REGISTER':
            return initRegisterOverlayHost<ParamList, RouteName>({ state, components: actions.component });
        case 'RESET_OPEN_LIST':
            return resetOpenListOverlayHost({ state });
        default:
            return state;
    }
};

export default reducer;
