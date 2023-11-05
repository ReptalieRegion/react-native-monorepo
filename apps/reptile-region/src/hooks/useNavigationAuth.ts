import { useNavigation, type NavigationProp } from '@react-navigation/native';

import type { RootRoutesParamList } from '<routes/root>';
import { useAuth } from '@/components/auth/organisms/Auth/hooks/useAuth';

type UseNavigationAuthProps = {};

const useNavigationAuth = ({}: UseNavigationAuthProps) => {
    const { isSignIn } = useAuth();
    const navigation = useNavigation<NavigationProp<RootRoutesParamList>>();

    const navigate = () => {
        if (!isSignIn) {
            navigation.navigate('sign-in');
        }
    };

    return navigate;
};

export default useNavigationAuth;
