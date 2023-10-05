import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { SharePostModalParamList } from '<RootRoutesV2>';
import SharePostUserDetailListHeader from '@/components/share-post/list/atoms/header/SharePostUserDetailListHeader';
import PostOptionsMenu from '@/pages/share-post/BottomSheet/PostOptionsMenu';
import SharePostDetailProfileModal, { SharePostDetailModalHeader } from '@/pages/share-post/detail/modal/page';
import SharePostUserListModalPage from '@/pages/share-post/list/user/modal/page';
import SharePostCommentRoutes from '@/routes/bottom-sheet/SharePostCommentRoutes';

const Stack = createNativeStackNavigator<SharePostModalParamList>();

export default function SharePostModalRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="detail"
                component={SharePostDetailProfileModal}
                options={{ header: SharePostDetailModalHeader }}
            />
            <Stack.Screen
                name="list/user"
                component={SharePostUserListModalPage}
                options={{ header: SharePostUserDetailListHeader }}
            />
            <Stack.Group
                screenOptions={{
                    presentation: 'containedTransparentModal',
                    headerShown: false,
                    animation: 'none',
                }}
            >
                <Stack.Screen name="bottom-sheet/comment" component={SharePostCommentRoutes} />
                <Stack.Screen name="bottom-sheet/post-options-menu" component={PostOptionsMenu} />
            </Stack.Group>
        </Stack.Navigator>
    );
}
