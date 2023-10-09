import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';

import BaseHeader, { HeaderProps } from '../BaseHeader';
import BottomSheetHeader, { BottomSheetHeaderProps } from '../BottomSheetHeader';

export const createNativeStackHeader = (headerProps?: HeaderProps) => {
    return (props: NativeStackHeaderProps) => {
        const HeaderRight = props.options.headerRight?.({ canGoBack: props.navigation.canGoBack() });

        return <BaseHeader {...headerProps} right={HeaderRight} />;
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
