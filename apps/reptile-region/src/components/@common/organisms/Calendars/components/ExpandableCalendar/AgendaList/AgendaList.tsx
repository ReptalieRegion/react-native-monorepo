// import { FlashList, type FlashListProps } from '@shopify/flash-list';
// import React, { useEffect, useRef } from 'react';
// import Animated, { useAnimatedStyle } from 'react-native-reanimated';

// import useCalendarState from '../../../hooks/useCalendarState';
// import type { CalendarListItem } from '../../../type';

// import useFlashListScroll from '@/hooks/@common/useFlashListScroll';

// export default function AgendaList<TDate>(props: FlashListProps<TDate>) {
//     const { flashListRef, scrollToIndex } = useFlashListScroll<CalendarListItem>();
//     const { selectedDateString } = useCalendarState();
//     const startScrollY = useRef(0);

//     useEffect(() => {
//         const index = props.data?.findIndex((item) => typeof item === 'string' && selectedDateString);
//         if (index && index !== -1) {
//             scrollToIndex({ index, animated: true });
//         }
//     }, [props.data, selectedDateString, scrollToIndex]);

//     const listAnimatedStyle = useAnimatedStyle(() => ({
//         transform: [{ translateY: 0 }],
//     }));

//     return (
//         <Animated.View style={listAnimatedStyle}>
//             <FlashList {...props} />
//         </Animated.View>
//     );
// }
