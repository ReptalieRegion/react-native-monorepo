import { createStackNavigator, type StackHeaderProps } from '@react-navigation/stack';
import React from 'react';

import ProgressHeader from '@/components/@common/molecules/Header/ProgressHeader';
import CreateEntity from '@/pages/diary/entity-manager/create/@common/context/CreateEntity/provider/CreateEntity';
import EntityManagerCongratsPage from '@/pages/diary/entity-manager/create/CongratsPage/page';
import EntityManagerGenderPage from '@/pages/diary/entity-manager/create/GenderPage/page';
import EntityManagerHatchingDayPage from '@/pages/diary/entity-manager/create/HatchingDayPage/page';
import EntityManagerImagePage from '@/pages/diary/entity-manager/create/ImagePage/page';
import EntityManagerNamePage from '@/pages/diary/entity-manager/create/NamePage/page';
import EntityManagerTypeAndMorphPage from '@/pages/diary/entity-manager/create/TypeAndMorphPage/page';
import EntityManagerWeightPage from '@/pages/diary/entity-manager/create/WeightPage/page';
import type { EntityManagerCreateParamList } from '@/types/routes/param-list/diary';

const Stack = createStackNavigator<EntityManagerCreateParamList>();

const Header = (headerProps: StackHeaderProps) => {
    return (
        <ProgressHeader
            {...headerProps}
            titleShown={false}
            steps={[
                {
                    name: '이미지',
                    leftIcon: 'cancel',
                },
                {
                    name: '성별',
                    leftIcon: 'back',
                },
                {
                    name: '해칭일',
                    leftIcon: 'back',
                },
                {
                    name: '모프',
                    leftIcon: 'back',
                },
                {
                    name: '몸무게',
                    leftIcon: 'back',
                },
                {
                    name: '이름',
                    leftIcon: 'back',
                },
                {
                    name: '완료',
                    leftIcon: 'back',
                },
            ]}
        />
    );
};

export default function EntityManagerCreateRoutes() {
    return (
        <CreateEntity>
            <Stack.Navigator
                initialRouteName="image"
                screenOptions={{
                    header: Header,
                    headerMode: 'float',
                }}
            >
                <Stack.Screen
                    name="image"
                    component={EntityManagerImagePage}
                    options={{
                        title: '이미지',
                    }}
                />
                <Stack.Screen
                    name="gender"
                    component={EntityManagerGenderPage}
                    options={{
                        title: '성별',
                    }}
                />
                <Stack.Screen
                    name="hatchingDay"
                    component={EntityManagerHatchingDayPage}
                    options={{
                        title: '해칭일',
                    }}
                />
                <Stack.Screen
                    name="type-and-morph"
                    component={EntityManagerTypeAndMorphPage}
                    options={{
                        title: '모프',
                    }}
                />
                <Stack.Screen
                    name="weight"
                    component={EntityManagerWeightPage}
                    options={{
                        title: '몸무게',
                    }}
                />
                <Stack.Screen
                    name="name"
                    component={EntityManagerNamePage}
                    options={{
                        title: '이름',
                    }}
                />
                <Stack.Screen
                    name="congrats"
                    component={EntityManagerCongratsPage}
                    options={{
                        gestureEnabled: false,
                        title: '완료',
                    }}
                />
            </Stack.Navigator>
        </CreateEntity>
    );
}
