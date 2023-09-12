import React, { ReactNode, useEffect, useReducer } from 'react';

import OverlayHost from '../components/OverlayHost';
import OverlayRegister from '../components/OverlayRegister';
import { INITIAL_STATE } from '../constants/constants';
import { OverlayStateContext, OverlayActionContext } from '../contexts/overlay-context';
import reducer from '../reducer/reducer';
import { OverlayComponents, ParamListBase } from '../types/overlay';

type OverlayProviderProps<ParamList extends ParamListBase, RouteName extends keyof ParamList> = {
    children: ReactNode;
    registerComponent: OverlayComponents<ParamList, RouteName>;
};

const OverlayProvider = <ParamList extends ParamListBase, RouteName extends keyof ParamList>({
    children,
    registerComponent,
}: OverlayProviderProps<ParamList, RouteName>) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    useEffect(() => {
        return () => {
            dispatch({ type: 'RESET_OPEN_LIST' });
        };
    }, []);

    return (
        <OverlayStateContext.Provider value={state}>
            <OverlayActionContext.Provider value={dispatch}>
                {children}
                <OverlayHost />
                <OverlayRegister registerComponent={registerComponent} />
            </OverlayActionContext.Provider>
        </OverlayStateContext.Provider>
    );
};

const createOverlay = <ParamList extends ParamListBase, RouteName extends keyof ParamList = keyof ParamList>() => {
    return {
        Container: ({ children, registerComponent }: OverlayProviderProps<ParamList, RouteName>) => {
            return <OverlayProvider<ParamList, RouteName> registerComponent={registerComponent}>{children}</OverlayProvider>;
        },
    };
};

export default createOverlay;
