import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import SharePostCommentBottomSheetRoutes from './CommentBottomSheet';
import SharePostPostingRoutes from './Posting';

import { SharePostParamList } from '<RootRoutes>';
import { NativeStackDefaultHeader } from '@/components/common/layouts/header/utils/create-header';
import SharePostDetailHeader from '@/components/share-post/detail/atoms/header/DetailHeader';
import SharePostUserDetailListHeader from '@/components/share-post/list/atoms/header/SharePostUserDetailListHeader';
import KebabMenuBottomSheet from '@/components/share-post/list/ui-prompts/bottomSheet/kebab-menu/KebabMenuBottomSheet';
import { SharePostDetailPage, SharePostListPage } from '@/pages/share-post';
import SharePostDetailProfileModal from '@/pages/share-post/detail/modal/page';
import SharePostUserListModalPage from '@/pages/share-post/list/user/modal/page';
import SharePostUserListPage from '@/pages/share-post/list/user/page';

const SharePostStack = createNativeStackNavigator<SharePostParamList>();

const SharePostRoutes = () => {
    return (
        <SharePostStack.Navigator initialRouteName="share-post/list">
            {/** BottomTab이 있는 페이지 */}
            <SharePostStack.Group navigationKey="share-post/bottom-tab">
                <SharePostStack.Screen
                    name="share-post/list"
                    component={SharePostListPage}
                    options={{ header: NativeStackDefaultHeader }}
                />
                <SharePostStack.Screen
                    name="share-post/list/user"
                    component={SharePostUserListPage}
                    options={{ header: SharePostUserDetailListHeader }}
                />
                <SharePostStack.Screen
                    name="share-post/detail"
                    component={SharePostDetailPage}
                    options={{ header: SharePostDetailHeader }}
                />
            </SharePostStack.Group>

            {/** BottomTab이 없는 페이지 */}
            <SharePostStack.Group navigationKey="share-post/modal" screenOptions={{ presentation: 'transparentModal' }}>
                <SharePostStack.Screen
                    name="share-post/modal/detail"
                    component={SharePostDetailProfileModal}
                    options={{ header: SharePostDetailHeader }}
                />
                <SharePostStack.Screen
                    name="share-post/modal/list/user"
                    component={SharePostUserListModalPage}
                    options={{ header: SharePostUserDetailListHeader }}
                />
                <SharePostStack.Screen
                    name="share-post/modal/posting"
                    component={SharePostPostingRoutes}
                    options={{ headerShown: false }}
                />
            </SharePostStack.Group>

            {/** Bottom Sheet */}
            <SharePostStack.Group
                navigationKey="share-post/bottom-sheet"
                screenOptions={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animation: 'none',
                }}
            >
                <SharePostStack.Screen name="share-post/bottom-sheet/comment" component={SharePostCommentBottomSheetRoutes} />
                <SharePostStack.Screen name="share-post/bottom-sheet/kebab-menu" component={KebabMenuBottomSheet} />
            </SharePostStack.Group>
        </SharePostStack.Navigator>
    );
};

export default SharePostRoutes;
