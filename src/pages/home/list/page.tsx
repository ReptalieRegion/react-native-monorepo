import React from 'react';
import { Text, View } from 'react-native';

import MainHeader from '@/components/ui/header/MainHeader';

const HomeListPage = () => {
    return (
        <View>
            <MainHeader leftIcon="logo" />
            <Text>HomeListPage</Text>
        </View>
    );
};

export default HomeListPage;
