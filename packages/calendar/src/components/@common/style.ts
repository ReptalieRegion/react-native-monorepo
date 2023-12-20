import { color } from '@crawl/design-system';
import { StyleSheet } from 'react-native';

import type { DotStyle, MarkingStyle } from '../../types/calendar';

const markingStyle: MarkingStyle = {
    backgroundColor: color.Gray[300].toString(),
};

const dotStyle: DotStyle = {
    width: 5,
    height: 5,
    backgroundColor: color.Teal[150].toString(),
};

const dayStyle = StyleSheet.create({
    wrapper: {
        width: '14.28%',
        height: 50,
    },
});

const headerStyles = StyleSheet.create({
    wrapper: {
        zIndex: 1,
        backgroundColor: color.White.toString(),
        height: 100,
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayNameWrapper: {
        flexDirection: 'row',
    },
    dayName: {
        flex: 1,
        alignItems: 'center',
    },
});

export { dayStyle, dotStyle, headerStyles, markingStyle };
