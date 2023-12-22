import { useNavigation } from '@react-navigation/native';

import type { EntityDetailParams } from '@/types/routes/params/diary';
import type { EntityNavigationProp } from '@/types/routes/props/diary/entity';

export default function useEntityMangerNavigation() {
    const navigation = useNavigation<EntityNavigationProp>();

    const navigateEntityCreatePage = () => {
        navigation.navigate('entity-manager/create', {
            screen: 'image',
        });
    };

    const navigateEntityUpdatePage = (props: EntityDetailParams) => {
        navigation.navigate('entity-manager/detail', props);
    };

    return {
        navigateEntityCreatePage,
        navigateEntityUpdatePage,
    };
}
