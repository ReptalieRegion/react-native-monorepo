import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import type { BottomTabLessParamList } from '<BottomTabLessNavigationList>';
import SharePostDetailHeader from '@/components/share-post/detail/atoms/header/DetailHeader';
import ImageCropHeader from '@/components/share-post/image-crop/atoms/header/ImageCropHeader';
import ShareHeader from '@/components/share-post/write/atoms/header/SharePostWriteHeader';
import UIPromptsContextComponent from '@/contexts/ui-prompts/UIPrompts';
import { SharePostDetailPage, SharePostImageCropPage, SharePostWritePage } from '@/pages/share-post';

const BottomTabLessRoutes = () => {
    const BottomTapLessStack = createNativeStackNavigator<BottomTabLessParamList>();

    return (
        <UIPromptsContextComponent>
            <BottomTapLessStack.Navigator>
                {/* SharePost */}
                <BottomTapLessStack.Group>
                    <BottomTapLessStack.Screen
                        name="share-post/detail"
                        component={SharePostDetailPage}
                        options={{ header: SharePostDetailHeader }}
                    />
                    <BottomTapLessStack.Screen
                        name="share-post/image-crop"
                        component={SharePostImageCropPage}
                        options={{ header: ImageCropHeader }}
                    />
                    <BottomTapLessStack.Screen
                        name="share-post/write"
                        component={SharePostWritePage}
                        options={{ header: ShareHeader }}
                    />
                </BottomTapLessStack.Group>
            </BottomTapLessStack.Navigator>
        </UIPromptsContextComponent>
    );
};

export default BottomTabLessRoutes;
