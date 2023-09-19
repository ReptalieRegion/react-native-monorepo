import { useNavigation } from '@react-navigation/native';
import { TouchableTypo } from 'design-system';
import React from 'react';
import { View } from 'react-native';

import { MyNavigationProp } from '<MyRoutes>';

const MyListPage = () => {
    const navigation = useNavigation<MyNavigationProp<'my/list'>>();
    const navigateSignIn = () => {
        navigation.push('auth/sign-in');
    };

    return (
        <View>
            <TouchableTypo onPress={navigateSignIn}>MyListPage</TouchableTypo>
        </View>
    );
};

export default MyListPage;
