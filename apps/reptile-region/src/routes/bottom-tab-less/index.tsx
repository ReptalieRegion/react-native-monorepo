import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import SharePostRoutes from './share-post/SharePost';

import { BottomTabLessParamList } from '<BottomTabLessNavigationList>';
import UIPromptsContextComponent from '@/contexts/ui-prompts/UIPrompts';

const BottomTabLessRoutes = () => {
    const BottomTapLessStack = createNativeStackNavigator<BottomTabLessParamList>();

    return (
        <UIPromptsContextComponent>
            <BottomTapLessStack.Navigator
                initialRouteName="bottom-tab-less/share-post/routes"
                screenOptions={{ headerShown: false }}
            >
                <BottomTapLessStack.Screen name="bottom-tab-less/share-post/routes" component={SharePostRoutes} />
            </BottomTapLessStack.Navigator>
        </UIPromptsContextComponent>
    );
};

export default BottomTabLessRoutes;
