import type { ImagesIndicatorActions, ImagesIndicatorState } from '../types';

const imageIndicatorReducer = (state: ImagesIndicatorState, actions: ImagesIndicatorActions): ImagesIndicatorState => {
    switch (actions.type) {
        case 'CALC_INDICATOR':
            return { ...state, indicatorIndex: Math.round(actions.contentOffsetX / actions.imageWidth) };
        default:
            return state;
    }
};

export default imageIndicatorReducer;
