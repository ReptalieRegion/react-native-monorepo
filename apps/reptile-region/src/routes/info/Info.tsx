import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import type { InfoParamList } from '<InfoRoutes>';
import { NativeStackDefaultHeader } from '@/components/common/layouts/header/utils/create-header';
import InfoListPage from '@/pages/info/list/page';

const InfoStack = createNativeStackNavigator<InfoParamList>();

const InfoRoutes = () => {
    return (
        <InfoStack.Navigator>
            <InfoStack.Screen name="info/list" component={InfoListPage} options={{ header: NativeStackDefaultHeader }} />
        </InfoStack.Navigator>
    );
};

export default InfoRoutes;
