import { useDebounce } from '@crawl/react-hooks';
import { FlashList, type ViewToken } from '@shopify/flash-list';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent, ViewabilityConfig } from 'react-native';

import useCalendarHandler from '../../hooks/useCalendarHandler';
import useCalendarState from '../../hooks/useCalendarState';

import type { AgendaListProps, ContentData, TitleData } from './type';

const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 100,
    waitForInteraction: true,
};

function AgendaList<TData>({ onScroll, openCalendar, closeCalendar, data, ...props }: AgendaListProps<TData>) {
    const { selectedDateString } = useCalendarState();
    const { setDate } = useCalendarHandler();
    const viewingDate = useRef(selectedDateString);
    const isScrollStart = useRef(false);
    const startScrollY = useRef(0);
    const agendaListRef = useRef<FlashList<ContentData<TData> | TitleData>>(null);

    const _handleMomentumScrollBegin = useCallback(() => {
        isScrollStart.current = true;
    }, []);

    const _handleScroll = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (startScrollY.current === 0) {
                const isDownScroll = event.nativeEvent.contentOffset.y < 0;
                const isUpScroll = event.nativeEvent.contentOffset.y > 0;
                if (isDownScroll) {
                    openCalendar();
                } else if (isUpScroll) {
                    closeCalendar();
                }
            }
            startScrollY.current = event.nativeEvent.contentOffset.y;
            onScroll?.(event);
        },
        [closeCalendar, onScroll, openCalendar],
    );

    const _handleViewableItemChanged = useDebounce((info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
        if (isScrollStart.current) {
            viewingDate.current = info.viewableItems[0]?.item.dateString;
            setDate(viewingDate.current);
            isScrollStart.current = false;
        }
    }, 500);

    useEffect(() => {
        if (selectedDateString !== viewingDate.current) {
            viewingDate.current = selectedDateString;
            const findMoveIndex = data?.findIndex((item) => item.type === 'TITLE' && item.dateString === selectedDateString);
            if (findMoveIndex !== undefined && findMoveIndex !== -1) {
                agendaListRef.current?.scrollToIndex({ index: findMoveIndex, animated: true });
            }
        }
    }, [data, selectedDateString]);

    return (
        <FlashList
            ref={agendaListRef}
            {...props}
            data={data}
            viewabilityConfig={viewabilityConfig}
            onScroll={_handleScroll}
            onMomentumScrollBegin={_handleMomentumScrollBegin}
            onViewableItemsChanged={_handleViewableItemChanged}
        />
    );
}

const genericMemo: <T>(
    component: T,
    propsAreEqual?: (prevProps: React.PropsWithChildren<T>, nextProps: React.PropsWithChildren<T>) => boolean,
) => T = memo;

export default genericMemo(AgendaList);
