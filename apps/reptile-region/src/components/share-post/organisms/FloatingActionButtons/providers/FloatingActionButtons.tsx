import React, { ReactNode, useMemo, useReducer } from 'react';

import { FloatingActionButtonActionsContext, FloatingActionButtonStateContext } from '../contexts/FloatingActionButtons';
import floatingButtonAnimationReducer from '../reducer/FloatingButtonAnimation';

type FloatingActionButtonProps = {
    children: ReactNode;
};

export default function FloatingActionButtons({ children }: FloatingActionButtonProps) {
    const [state, dispatch] = useReducer(floatingButtonAnimationReducer, { startAnimation: false });
    const memorizationChildren = useMemo(() => children, [children]);

    return (
        <FloatingActionButtonActionsContext.Provider value={dispatch}>
            <FloatingActionButtonStateContext.Provider value={state}>
                {memorizationChildren}
            </FloatingActionButtonStateContext.Provider>
        </FloatingActionButtonActionsContext.Provider>
    );
}
