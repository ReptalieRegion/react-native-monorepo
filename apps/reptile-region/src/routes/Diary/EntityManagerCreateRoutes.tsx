import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HeaderBackButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { BackButton, CancelButton } from '@/assets/icons';
import CreateEntity from '@/pages/diary/entity-manager/create/@common/context/CreateEntity/provider/CreateEntity';
import EntityManagerCongratsPage from '@/pages/diary/entity-manager/create/CongratsPage/page';
import EntityManagerGenderPage from '@/pages/diary/entity-manager/create/GenderPage/page';
import EntityManagerHatchingDayPage from '@/pages/diary/entity-manager/create/HatchingDayPage/page';
import EntityManagerImagePage from '@/pages/diary/entity-manager/create/ImagePage/page';
import EntityManagerNamePage from '@/pages/diary/entity-manager/create/NamePage/page';
import EntityManagerTypeAndMorphPage from '@/pages/diary/entity-manager/create/TypeAndMorphPage/page';
import EntityManagerWeightPage from '@/pages/diary/entity-manager/create/WeightPage/page';
import type { EntityManagerCreateParamList } from '@/types/routes/param-list/diary';

const Stack = createNativeStackNavigator<EntityManagerCreateParamList>();

const Cancel = (props: HeaderBackButtonProps) => {
    const navigation = useNavigation();

    const handlePressBack = () => {
        if (props.canGoBack) {
            navigation.goBack();
        }
    };

    return (
        <TouchableOpacity onPress={handlePressBack}>
            <CancelButton width={30} height={30} />
        </TouchableOpacity>
    );
};

const Back = (props: HeaderBackButtonProps) => {
    const navigation = useNavigation();

    const handlePressBack = () => {
        if (props.canGoBack) {
            navigation.goBack();
        }
    };

    return (
        <TouchableOpacity onPress={handlePressBack}>
            <BackButton width={30} height={30} />
        </TouchableOpacity>
    );
};

export default function EntityManagerCreateRoutes() {
    return (
        <CreateEntity>
            <Stack.Navigator initialRouteName="image">
                <Stack.Screen
                    name="image"
                    component={EntityManagerImagePage}
                    options={{
                        headerLeft: Cancel,
                        headerTitle: '',
                        headerShadowVisible: false,
                    }}
                />
                <Stack.Screen
                    name="gender"
                    component={EntityManagerGenderPage}
                    options={{
                        headerLeft: Back,
                        headerTitle: '',
                        headerShadowVisible: false,
                    }}
                />
                <Stack.Screen
                    name="hatchingDay"
                    component={EntityManagerHatchingDayPage}
                    options={{
                        headerLeft: Back,
                        headerTitle: '',
                        headerShadowVisible: false,
                    }}
                />
                <Stack.Screen
                    name="type-and-morph"
                    component={EntityManagerTypeAndMorphPage}
                    options={{
                        headerLeft: Back,
                        headerTitle: '',
                        headerShadowVisible: false,
                    }}
                />
                <Stack.Screen
                    name="weight"
                    component={EntityManagerWeightPage}
                    options={{
                        headerLeft: Back,
                        headerTitle: '',
                        headerShadowVisible: false,
                    }}
                />
                <Stack.Screen
                    name="name"
                    component={EntityManagerNamePage}
                    options={{
                        headerLeft: Back,
                        headerTitle: '',
                        headerShadowVisible: false,
                    }}
                />
                <Stack.Screen
                    name="congrats"
                    component={EntityManagerCongratsPage}
                    options={{
                        gestureEnabled: false,
                        headerBackVisible: false,
                        headerTitle: '',
                        headerShadowVisible: false,
                    }}
                />
            </Stack.Navigator>
        </CreateEntity>
    );
}
