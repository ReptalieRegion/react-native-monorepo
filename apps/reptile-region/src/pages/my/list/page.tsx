import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { RootStackParamList } from '<RootRoutes>';

const MyListPage = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'bottom-tab'>>();
    const navigateSignIn = () => {
        navigation.navigate('auth/sign-in');
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
