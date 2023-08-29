import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import type { BottomTabStackNavigationProp } from '<RootRoutes>';

const MyListPage = () => {
    const navigation = useNavigation<BottomTabStackNavigationProp>();
    const navigateSignIn = () => {
        navigation.navigate('bottom-tab-less-slide-from-bottom', { screen: 'auth/sign-in' });
    };

    return (
        <View>
            <TouchableWithoutFeedback onPress={navigateSignIn}>
                <Text>MyListPage</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default MyListPage;
