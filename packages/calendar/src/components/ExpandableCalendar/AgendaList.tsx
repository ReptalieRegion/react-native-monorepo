import { FlashList, type FlashListProps, type ViewToken } from '@shopify/flash-list';
import React, { forwardRef, useCallback, useRef } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent, ViewabilityConfig } from 'react-native';

import useCalendarHandler from '../../hooks/useCalendarHandler';
import useCalendarState from '../../hooks/useCalendarState';

type AgendaListState = {};

interface AgendaListActions {
    openCalendar(): void;
    closeCalendar(): void;
}

export type TitleData = {
    type: 'TITLE';
    dateString: string;
    label: string;
};

export type AgendaListProps<TData> = AgendaListState &
    AgendaListActions &
    Omit<FlashListProps<TitleData | TData>, 'viewabilityConfig' | 'onMomentumScrollEnd'>;

const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 20,
    waitForInteraction: true,
};

function AgendaListInner<TData>(
    { onScroll, openCalendar, closeCalendar, ...props }: AgendaListProps<TData>,
    ref: React.ForwardedRef<FlashList<TData | TitleData>>,
) {
    const { selectedDateString } = useCalendarState();
    const { setDate } = useCalendarHandler();
    const viewingDate = useRef(selectedDateString);
    const startScrollY = useRef(0);

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

    const _handleViewableItemChanged = useCallback((info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
        viewingDate.current = info.viewableItems.find((viewToken) => viewToken.item.type === 'TITLE')?.item.dateString;
    }, []);

    const _handleScrollMomentumScrollEnd = useCallback(() => {
        if (viewingDate.current) {
            setDate(viewingDate.current);
        }
    }, [setDate]);

    return (
        <FlashList
            ref={ref}
            {...props}
            viewabilityConfig={viewabilityConfig}
            onScroll={_handleScroll}
            onMomentumScrollEnd={_handleScrollMomentumScrollEnd}
            onViewableItemsChanged={_handleViewableItemChanged}
        />
    );
}

const AgendaList = forwardRef(AgendaListInner) as <TData>(
    props: AgendaListProps<TData> & {
        ref: React.ForwardedRef<FlashList<TData | TitleData>>;
    },
) => ReturnType<typeof AgendaListInner>;

export default AgendaList;
