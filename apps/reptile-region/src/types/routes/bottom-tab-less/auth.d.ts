declare module '<BottomTabLessAuthRoutes>' {
    import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

    type BottomTabLessAuthSignInNavigationProp = NativeStackNavigationProp<BottomTabLessAuthParamList, 'auth/sign-in'>;
    type BottomTabLessAuthSignUpNavigationProp = NativeStackNavigationProp<BottomTabLessAuthParamList, 'auth/sign-up'>;

    type BottomTabLessAuthParamList = {
        'auth/sign-in': undefined;
        'auth/sign-up': undefined;
    };
}
