import { useNavigation, type CompositeNavigationProp, type NavigationProp } from '@react-navigation/native';

import type { RootRoutesParamList } from '@/types/routes/param-list';
import type { EntityManagerParamList } from '@/types/routes/param-list/diary';
import type { EntityDetailParams } from '@/types/routes/params/diary';

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

    const navigateEntityUpdatePage = (props: EntityDetailParams) => {
        navigation.navigate('entity-manager/update', props);
    };

    return {
        navigateEntityCreatePage,
        navigateEntityUpdatePage,
    };
};

export default useEntityMangerNavigation;
