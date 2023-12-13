import { Typo, color, type TextColorType, type VariantType } from '@crawl/design-system';
import React, { useCallback, useMemo } from 'react';
import { View, type ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { headerStyles } from './style';

import { LeftArrow, RightArrow } from '@/assets/icons';

type HeaderState = {
    label: string;
    dayNames?: string[];
    containerStyle?: ViewStyle;
    labelStyle?: {
        variant: VariantType;
        color: TextColorType;
    };
    isPossiblePrevMonth: boolean;
    isPossibleNextMonth: boolean;
};

export interface HeaderActions {
    onPressLeft?(): void;
    onPressRight?(): void;
}

type HeaderProps = HeaderState & HeaderActions;

export default function Header({
    dayNames = ['일', '월', '화', '수', '목', '금', '토'],
    containerStyle,
    labelStyle = {
        variant: 'title3',
        color: 'default',
    },
    label,
    isPossibleNextMonth,
    isPossiblePrevMonth,
    onPressLeft,
    onPressRight,
}: HeaderProps) {
    const headerWrapperStyle = useMemo(() => [containerStyle, headerStyles.wrapper], [containerStyle]);

    const renderDayNames = useCallback(() => {
        return (
            <View style={headerStyles.dayNameWrapper}>
                {dayNames.map((dayName) => (
                    <View key={dayName} style={headerStyles.dayName}>
                        <Typo textAlign="center" variant="title4">
                            {dayName}
                        </Typo>
                    </View>
                ))}
            </View>
        );
    }, [dayNames]);

    return (
        <View style={headerWrapperStyle}>
            <View style={headerStyles.iconContainer}>
                <TouchableOpacity onPress={isPossiblePrevMonth ? onPressLeft : undefined}>
                    <LeftArrow
                        width={26}
                        height={26}
                        fill={isPossiblePrevMonth ? color.DarkGray[500].toString() : color.Gray[500].toString()}
                    />
                </TouchableOpacity>
                <Typo variant={labelStyle.variant} color={labelStyle.color}>
                    {label}
                </Typo>
                <TouchableOpacity onPress={isPossibleNextMonth ? onPressRight : undefined}>
                    <RightArrow
                        width={26}
                        height={26}
                        fill={isPossibleNextMonth ? color.DarkGray[500].toString() : color.Gray[500].toString()}
                    />
                </TouchableOpacity>
            </View>
            {renderDayNames()}
        </View>
    );
}
