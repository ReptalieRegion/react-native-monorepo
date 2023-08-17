import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';

import BaseHeader, { IHeaderProps } from '../BaseHeader';

export const createNativeStackHeader = (headerProps?: IHeaderProps) => {
    return (_: NativeStackHeaderProps) => <BaseHeader {...headerProps} />;
};

export const createBottomTabHeader = (headerProps?: IHeaderProps) => {
    return (_: BottomTabHeaderProps) => <BaseHeader {...headerProps} />;
};

export const NativeStackDefaultHeader = createNativeStackHeader();

export const BottomTabDefaultHeader = createBottomTabHeader();
