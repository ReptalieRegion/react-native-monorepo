import { useContext } from 'react';

import { OverlayActionContext } from '../contexts/overlay-context';
import { OverlayProp, ParamListBase, ScreenComponentType } from '../types/overlay';

const useOverlay = <ParamList extends ParamListBase>(): OverlayProp<ParamList> => {
    const dispatch = useContext(OverlayActionContext);

    if (dispatch === null) {
        throw new Error('Provider를 감싸주세요');
    }

    const openOverlay = <RouteName extends keyof ParamList>(name: RouteName, params: ParamList[RouteName]) => {
        dispatch({ type: 'OPEN', name: name as string, params });
    };

    const closeOverlay = <RouteName extends keyof ParamList>(name: RouteName) => {
        dispatch({ type: 'CLOSE', name: name as string });
    };

    const registerOverlay = <RouteName extends keyof ParamList>(
        name: RouteName,
        options: {
            component: ScreenComponentType<ParamList, RouteName>;
        },
    ) => {
        dispatch({
            type: 'REGISTER',
            name: name as string,
            component: options.component as ScreenComponentType<ParamListBase, string>,
        });
    };

    return {
        openOverlay,
        closeOverlay,
        registerOverlay,
    };
};

export default useOverlay;
