import React from 'react';
import { Text, View } from 'react-native';

import MainHeader from '@/components/ui/header/MainHeader';

const MyListPage = () => {
    return (
        <View>
            <MainHeader leftIcon="logo" />
            <Text>MyListPage</Text>
        </View>
    );
};

export default MyListPage;
