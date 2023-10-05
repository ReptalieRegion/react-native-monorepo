import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TouchableTypo } from 'design-system';
import React from 'react';
import { View } from 'react-native';

import { RootRoutesParamList } from '<RootRoutesV2>';
import { MyTabParamList } from '<routes/bottom-tab>';

type MyListScreenProps = CompositeScreenProps<
    NativeStackScreenProps<MyTabParamList, 'my/list'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

const MyListPage = ({ navigation }: MyListScreenProps) => {
    const navigateSignIn = () => {
        navigation.navigate('sign-in');
    };

    return (
        <View>
            <TouchableTypo onPress={navigateSignIn}>MyListPage</TouchableTypo>
        </View>
    );
};

export default MyListPage;
