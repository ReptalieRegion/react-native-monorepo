import { useCallback, useContext } from 'react';

import { ImageCarouselRefContext, ImageIndicatorActionsContext } from '../contexts/ImageIndicator';

const useImageCarouselHandler = () => {
    const state = useContext(ImageCarouselRefContext);
    const dispatch = useContext(ImageIndicatorActionsContext);

    if (dispatch === null || state === null) {
        throw new Error('ImageCarousel Provider를 감싸주세요.');
    }

    const handleScrollCalcIndicator = useCallback(
        ({ contentOffsetX, imageWidth }: { contentOffsetX: number; imageWidth: number }) => {
            dispatch({ type: 'CALC_INDICATOR', contentOffsetX, imageWidth });
        },
        [dispatch],
    );

    const scrollIntoView = useCallback(
        ({ offset, animated = false }: { offset: number; animated?: boolean }) => {
            state.imageCarouselRef.current?.scrollToOffset({ offset, animated });
        },
        [state.imageCarouselRef],
    );

    return { handleScrollCalcIndicator, scrollIntoView };
};

export default useImageCarouselHandler;
