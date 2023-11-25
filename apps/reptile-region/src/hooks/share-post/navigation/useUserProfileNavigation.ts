import { useNavigation } from '@react-navigation/native';

const useUserProfileNavigation = () => {
    const navigation = useNavigation();
    const handlePressProfile = () => {
        navigation;
        console.log('hi');
    };

    return {
        handlePressProfile,
    };
};

export default useUserProfileNavigation;
