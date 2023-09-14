import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';

import BaseHeader, { IHeaderProps } from '../BaseHeader';
import BottomSheetHeader, { BottomSheetHeaderProps } from '../BottomSheetHeader';

export const createNativeStackHeader = (headerProps?: IHeaderProps) => {
    return (_: NativeStackHeaderProps) => <BaseHeader {...headerProps} />;
};

export const createBottomTabHeader = (headerProps?: IHeaderProps) => {
    return (_: BottomTabHeaderProps) => <BaseHeader {...headerProps} />;
};

export const createBottomSheetNativeStackHeader = (headerProps: BottomSheetHeaderProps) => {
    return (stackHeaderProps: NativeStackHeaderProps) => <BottomSheetHeader {...headerProps} {...stackHeaderProps} />;
};

export const NativeStackDefaultHeader = createNativeStackHeader();

export const BottomTabDefaultHeader = createBottomTabHeader();
