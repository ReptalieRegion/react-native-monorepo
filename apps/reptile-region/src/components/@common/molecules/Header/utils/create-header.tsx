import type { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';

import type { HeaderProps } from '../BaseHeader';
import BaseHeader from '../BaseHeader';
import type { BottomSheetHeaderProps } from '../BottomSheetHeader';
import BottomSheetHeader from '../BottomSheetHeader';

export const createNativeStackHeader = (headerProps?: HeaderProps) => {
    return (props: NativeStackHeaderProps) => {
        const headerTitle = headerProps?.title === '' ? (props.options.headerTitle as string) : headerProps?.title;
        const HeaderRight = props.options.headerRight?.({ canGoBack: props.navigation.canGoBack() });

        return <BaseHeader {...headerProps} title={headerTitle} right={HeaderRight} />;
    };
};

export const createBottomTabHeader = (headerProps?: HeaderProps) => {
    return (_: BottomTabHeaderProps) => <BaseHeader {...headerProps} />;
};

export const createBottomSheetNativeStackHeader = (headerProps: BottomSheetHeaderProps) => {
    return (stackHeaderProps: NativeStackHeaderProps) => <BottomSheetHeader {...headerProps} {...stackHeaderProps} />;
};

export const NativeStackDefaultHeader = createNativeStackHeader();

export const BottomTabDefaultHeader = createBottomTabHeader();
