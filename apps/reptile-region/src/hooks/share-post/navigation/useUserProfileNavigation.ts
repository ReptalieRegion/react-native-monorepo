import { useNavigation } from '@react-navigation/native';

const useUserProfileNavigation = () => {
    const navigation = useNavigation();
    const handlePressProfile = () => {
        navigation;
    };

    return {
        handlePressProfile,
    };
};

export default useUserProfileNavigation;
