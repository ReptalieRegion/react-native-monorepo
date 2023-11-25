import { useNavigation, type NavigationProp } from '@react-navigation/native';

import { useAuth } from '@/components/auth/organisms/Auth/hooks/useAuth';
import type { RootRoutesParamList } from '@/types/routes/param-list';

const useNavigationAuth = () => {
    const { isSignIn } = useAuth();
    const navigation = useNavigation<NavigationProp<RootRoutesParamList>>();

    const navigate = () => {
        if (!isSignIn) {
            navigation.navigate('sign-in', { successNavigate: 'ME' });
        }
    };

    return navigate;
};

export default useNavigationAuth;
