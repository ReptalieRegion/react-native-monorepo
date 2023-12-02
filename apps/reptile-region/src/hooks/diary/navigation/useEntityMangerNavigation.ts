import { useNavigation, type CompositeNavigationProp, type NavigationProp } from '@react-navigation/native';

import type { RootRoutesParamList } from '@/types/routes/param-list';
import type { EntityManagerParamList } from '@/types/routes/param-list/diary';

type EntityNavigationProp = CompositeNavigationProp<
    NavigationProp<EntityManagerParamList, 'entity-manager/list'>,
    NavigationProp<RootRoutesParamList>
>;

const useEntityMangerNavigation = () => {
    const navigation = useNavigation<EntityNavigationProp>();

    const navigateEntityCreatePage = () => {
        navigation.navigate('entity-manager/create', {
            screen: 'image',
        });
    };

    const navigateEntityCreatePage1 = () => {
        navigation.navigate('entity-manager/create1', {
            screen: 'image',
        });
    };

    const navigateEntityUpdatePage = () => {
        navigation.navigate('entity-manager/update');
    };

    return {
        navigateEntityCreatePage,
        navigateEntityCreatePage1,
        navigateEntityUpdatePage,
    };
};

export default useEntityMangerNavigation;
