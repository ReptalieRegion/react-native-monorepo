import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { MyNavigationProp } from '<MyRoutes>';

const MyListPage = () => {
    const navigation = useNavigation<MyNavigationProp<'my/list'>>();
    const navigateSignIn = () => {
        navigation.push('auth/sign-in');
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
