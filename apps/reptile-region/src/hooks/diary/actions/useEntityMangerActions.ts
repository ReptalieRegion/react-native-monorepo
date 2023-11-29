import useFloatingHandler from '@/components/share-post/organisms/FloatingActionButtons/hooks/useFloatingHandler';
import useFlashListScroll from '@/hooks/@common/useFlashListScroll';
import type { Data } from '@/pages/diary/entity-manager/ListPage/test';

export default function useEntityMangerActions() {
    const { secondaryIconDownAnimation, secondaryIconUpAnimation } = useFloatingHandler();
    const { flashListRef, determineScrollDirection, scrollToTop } = useFlashListScroll<Data>({
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
