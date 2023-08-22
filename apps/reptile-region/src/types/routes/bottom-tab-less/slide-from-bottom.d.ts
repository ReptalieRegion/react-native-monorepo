declare module '<BottomTabLessSlidFromBottomNavigationList>' {
    import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

    // Auth
    type BottomTabLessAuthSignInNavigationProp = NativeStackNavigationProp<BottomTabLessParamList, 'auth/sign-in'>;
    type BottomTabLessAuthSignUpNavigationProp = NativeStackNavigationProp<BottomTabLessParamList, 'auth/sign-up'>;

    // ParamList
    type BottomTabLessSlideFromBottomParamList = {
        'auth/sign-in': undefined;
        'auth/sign-up': undefined;
    };
}
