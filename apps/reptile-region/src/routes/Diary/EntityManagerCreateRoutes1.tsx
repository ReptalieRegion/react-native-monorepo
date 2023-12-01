import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HeaderBackButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { BackButton, CancelButton } from '@/assets/icons';
import CreateEntity from '@/components/diary/organisms/CreateEntity/provider/CreateEntity';
import EntityManagerCongratsPage from '@/pages/diary/entity-manager/create/CongratsPage/page1';
import EntityManagerGenderPage from '@/pages/diary/entity-manager/create/GenderPage/page1';
import EntityManagerHatchingDayPage from '@/pages/diary/entity-manager/create/HatchingDayPage/page1';
import EntityManagerImagePage from '@/pages/diary/entity-manager/create/ImagePage/page1';
import EntityManagerNamePage from '@/pages/diary/entity-manager/create/NamePage/page1';
import EntityManagerTypeAndMorphPage from '@/pages/diary/entity-manager/create/TypeAndMorphPage/page1';
import EntityManagerWeightPage from '@/pages/diary/entity-manager/create/WeightPage/page1';
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
                        headerTitle: '이미지 등록',
                    }}
                />
                <Stack.Screen
                    name="gender"
                    component={EntityManagerGenderPage}
                    options={{ headerLeft: Back, headerTitle: '성별 등록' }}
                />
                <Stack.Screen
                    name="hatchingDay"
                    component={EntityManagerHatchingDayPage}
                    options={{ headerLeft: Back, headerTitle: '해칭일 등록' }}
                />
                <Stack.Screen
                    name="type-and-morph"
                    component={EntityManagerTypeAndMorphPage}
                    options={{ headerLeft: Back, headerTitle: '종류 & 모프 등록' }}
                />
                <Stack.Screen
                    name="weight"
                    component={EntityManagerWeightPage}
                    options={{ headerLeft: Back, headerTitle: '몸무게 등록' }}
                />
                <Stack.Screen
                    name="name"
                    component={EntityManagerNamePage}
                    options={{ headerLeft: Back, headerTitle: '이름' }}
                />
                <Stack.Screen
                    name="congrats"
                    component={EntityManagerCongratsPage}
                    options={{ headerLeft: Back, headerTitle: '등록 완료' }}
                />
            </Stack.Navigator>
        </CreateEntity>
    );
}