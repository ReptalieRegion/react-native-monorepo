import { useContext } from 'react';

import { OverlayActionContext } from '../contexts/overlay-context';
import { OverlayProp, ParamListBase, ScreenComponentType } from '../types/overlay';

const useOverlay = <ParamList extends ParamListBase, RouteName extends keyof ParamList = keyof ParamList>() => {
    const dispatch = useContext(OverlayActionContext);

    if (dispatch === null) {
        throw new Error('Provider를 감싸주세요');
    }

    const openOverlay = ({ name, params }: { name: RouteName; params?: ParamList[RouteName] }) => {
        dispatch({ type: 'OPEN', name: name as string, params });
    };

    const closeOverlay = (name: RouteName) => {
        dispatch({ type: 'CLOSE', name: name as string });
    };

    const registerOverlay = ({
        name,
        component,
    }: {
        name: RouteName;
        component: ScreenComponentType<ParamList, RouteName>;
    }) => {
        dispatch({
            type: 'REGISTER',
            name: name as string,
            component: component as ScreenComponentType<ParamListBase, string>,
        });
    };

    return {
        openOverlay,
        closeOverlay,
        registerOverlay,
    } as unknown as OverlayProp<ParamList, RouteName>;
};

export default useOverlay;
