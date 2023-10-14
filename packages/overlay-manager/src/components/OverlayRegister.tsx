import { useContext, useEffect } from 'react';

import { OverlayActionContext } from '../contexts/overlay-context';
import type { OverlayComponents, ParamListBase } from '../types/overlay';

type OverlayRegisterProps<ParamList extends ParamListBase, RouteName extends keyof ParamList> = {
    registerComponent: OverlayComponents<ParamList, RouteName>;
};

const OverlayRegister = <ParamList extends ParamListBase, RouteName extends keyof ParamList>({
    registerComponent,
}: OverlayRegisterProps<ParamList, RouteName>) => {
    const dispatch = useContext(OverlayActionContext);

    if (dispatch === null) {
        throw new Error('Provider를 감싸주세요');
    }

    useEffect(() => {
        dispatch({ type: 'INIT_REGISTER', component: registerComponent as any });
    }, [dispatch, registerComponent]);

    return null;
};

export default OverlayRegister;
