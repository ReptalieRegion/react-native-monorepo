import useFloatingHandler from '@/components/share-post/organisms/FloatingActionButtons/hooks/useFloatingHandler';
import useFlashListScroll from '@/hooks/@common/useFlashListScroll';
import type { FetchEntityListResponse } from '@/types/apis/diary/entity';

export default function useEntityMangerActions() {
    const { secondaryIconDownAnimation, secondaryIconUpAnimation } = useFloatingHandler();
    const { flashListRef, determineScrollDirection, scrollToTop } = useFlashListScroll<FetchEntityListResponse>({
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
