import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { BottomTabLessSlideFromBottomParamList } from '<BottomTabLessSlidFromBottomNavigationList>';
import AuthSignInHeader from '@/components/auth/sign-in/header';
import UIPromptsContextComponent from '@/contexts/ui-prompts/UIPrompts';
import SignInPage from '@/pages/auth/sign-in/page';
import SignUpPage from '@/pages/auth/sign-up/page';

const BottomTabLessSlideFromBottomRoutes = () => {
    const BottomTabLessSlideFromBottomStack = createNativeStackNavigator<BottomTabLessSlideFromBottomParamList>();

    return (
        <UIPromptsContextComponent>
            <BottomTabLessSlideFromBottomStack.Navigator>
                {/* Auth */}
                <BottomTabLessSlideFromBottomStack.Group>
                    <BottomTabLessSlideFromBottomStack.Screen
                        name="auth/sign-in"
                        component={SignInPage}
                        options={{ header: AuthSignInHeader }}
                    />
                    <BottomTabLessSlideFromBottomStack.Screen name="auth/sign-up" component={SignUpPage} />
                </BottomTabLessSlideFromBottomStack.Group>
            </BottomTabLessSlideFromBottomStack.Navigator>
        </UIPromptsContextComponent>
    );
};

export default BottomTabLessSlideFromBottomRoutes;
