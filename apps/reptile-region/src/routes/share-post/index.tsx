import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import SharePostCommentBottomSheetRoutes from './CommentBottomSheet';

import type { SharePostParamList } from '<SharePostRoutes>';
import { NativeStackDefaultHeader } from '@/components/common/layouts/header/utils/create-header';
import SharePostDetailHeader from '@/components/share-post/detail/atoms/header/DetailHeader';
import ImageCropHeader from '@/components/share-post/image-crop/atoms/header/ImageCropHeader';
import KebabMenuBottomSheet from '@/components/share-post/list/ui-prompts/bottomSheet/kebab-menu/KebabMenuBottomSheet';
import SharePostWriteHeader from '@/components/share-post/write/atoms/header/SharePostWriteHeader';
import { SharePostDetailPage, SharePostImageCropPage, SharePostListPage, SharePostWritePage } from '@/pages/share-post';

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
                    name="share-post/detail"
                    component={SharePostDetailPage}
                    options={{ header: SharePostDetailHeader }}
                />
            </SharePostStack.Group>

            {/** BottomTab이 없는 페이지 */}
            <SharePostStack.Group
                navigationKey="share-post/modal"
                screenOptions={{
                    presentation: 'transparentModal',
                    animation: 'none',
                }}
            >
                <SharePostStack.Screen
                    name="share-post/modal/detail"
                    component={SharePostDetailPage}
                    options={{
                        header: SharePostDetailHeader,
                    }}
                />
                <SharePostStack.Screen
                    name="share-post/modal/image-crop"
                    component={SharePostImageCropPage}
                    options={{
                        header: ImageCropHeader,
                    }}
                />
                <SharePostStack.Screen
                    name="share-post/modal/write"
                    component={SharePostWritePage}
                    options={{
                        header: SharePostWriteHeader,
                    }}
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
