import type { FloatingActionButtonActions, FloatingActionButtonState } from '../contexts/FloatingActionButtons';

const floatingButtonAnimationReducer = (
    state: FloatingActionButtonState,
    actions: FloatingActionButtonActions,
): FloatingActionButtonState => {
    switch (actions.type) {
        case 'SECONDARY_UP_ANIMATION':
            return { ...state, startAnimation: true };
        case 'SECONDARY_DOWN_ANIMATION':
            return { ...state, startAnimation: false };
        default:
            return state;
    }
};

export default floatingButtonAnimationReducer;
