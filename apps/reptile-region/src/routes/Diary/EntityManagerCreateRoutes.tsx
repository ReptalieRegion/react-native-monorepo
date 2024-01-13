import { createStackNavigator, type StackHeaderProps } from '@react-navigation/stack';
import React from 'react';

import ProgressHeader from '@/components/@common/molecules/Header/ProgressHeader';
import CreateEntity from '@/pages/diary/entity-manager/Create/@common/context/CreateEntity/provider/CreateEntity';
import EntityManagerCongratsPage from '@/pages/diary/entity-manager/Create/CongratsPage/page';
import EntityManagerGenderPage from '@/pages/diary/entity-manager/Create/GenderPage/page';
import EntityManagerHatchingDayPage from '@/pages/diary/entity-manager/Create/HatchingDayPage/page';
import EntityManagerImagePage from '@/pages/diary/entity-manager/Create/ImagePage/page';
import EntityManagerNamePage from '@/pages/diary/entity-manager/Create/NamePage/page';
import EntityManagerTypeAndMorphPage from '@/pages/diary/entity-manager/Create/TypeAndMorphPage/page';
import EntityManagerWeightPage from '@/pages/diary/entity-manager/Create/WeightPage/page';
import type { EntityManagerCreateParamList } from '@/types/routes/param-list/diary';

const Stack = createStackNavigator<EntityManagerCreateParamList>();

const Header = (headerProps: StackHeaderProps) => {
    return (
        <ProgressHeader
            {...headerProps}
            titleShown={false}
            steps={['이미지', '성별', '해칭일', '모프', '몸무게', '이름', '완료']}
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
