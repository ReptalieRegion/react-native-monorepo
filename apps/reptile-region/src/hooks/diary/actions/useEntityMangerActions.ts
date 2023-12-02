import useFloatingHandler from '@/components/share-post/organisms/FloatingActionButtons/hooks/useFloatingHandler';
import useFlashListScroll from '@/hooks/@common/useFlashListScroll';
import type { DiaryEntity } from '@/mocks/data/dirary-mock';

export default function useEntityMangerActions() {
    const { secondaryIconDownAnimation, secondaryIconUpAnimation } = useFloatingHandler();
    const { flashListRef, determineScrollDirection, scrollToTop } = useFlashListScroll<DiaryEntity>({
        onScrollDown: secondaryIconDownAnimation,
        onScrollUp: secondaryIconUpAnimation,
    });

    const handlePressUpFloatingButton = () => {
        scrollToTop(true);
    };

    return {
        flashListRef,
        handleScroll: determineScrollDirection,
        handlePressUpFloatingButton,
    };
}
