import type { TextColorType, VariantType } from '@crawl/design-system';
import type { ViewStyle } from 'react-native';

import type { DateType, DotStyle, MarkingStyle } from '../../types/calendar';

type DayState = {
    date: DateType;
    textColor?: TextColorType;
    markingStyle?: MarkingStyle;
    dotStyle?: DotStyle;
};

interface DayActions {
    onPress?(): void;
}

type DayProps = DayState & DayActions;

type HeaderState = {
    label?: string;
    dayNames?: string[];
    containerStyle?: ViewStyle;
    labelStyle?: {
        variant: VariantType;
        color: TextColorType;
    };
};

interface HeaderActions {
    monthFormat?(date: Date): string;
    onPressLeft?(): void;
    onPressRight?(): void;
}

type HeaderProps = HeaderState & HeaderActions;

export type { DayProps, HeaderActions, HeaderProps };
