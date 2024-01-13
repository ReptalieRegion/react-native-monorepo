import { useWindowDimensions } from 'react-native';

const GAP = 5;
const MARGIN_HORIZONTAL = GAP / 2;
const SHARE_POST_HEIGHT = 200;

export default function useCalcCarouselSize() {
    const { width } = useWindowDimensions();
    const imageWidth = width / 2 - 25;
    const offset = 20 - MARGIN_HORIZONTAL;

    return {
        imageWidth,
        offset,
        gap: GAP,
        sharePostHeight: SHARE_POST_HEIGHT,
        marginHorizontal: MARGIN_HORIZONTAL,
    };
}
