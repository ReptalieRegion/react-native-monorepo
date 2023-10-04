import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomSheet } from 'bottom-sheet';
import { color } from 'design-system';
import React from 'react';
import { useAnimatedKeyboard } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SharePostCommentBottomSheetParamList } from '<SharePostRoutes>';
import { BottomSheetHeader } from '@/components/@common/molecules';
import { SharePostCommentPage, SharePostCommentReplyPage } from '@/pages/share-post';

const Stack = createNativeStackNavigator<SharePostCommentBottomSheetParamList>();

const SharePostCommentBottomSheetRoutes = ({ navigation }: { navigation: any }) => {
    const insets = useSafeAreaInsets();
    const { state } = useAnimatedKeyboard();
    const handleClose = () => {
        if (state.value === 0 || state.value === 4) {
            navigation.goBack();
        }
    };

    return (
        <BottomSheet onClose={handleClose} snapInfo={{ startIndex: 1, pointsFromTop: ['60%', '100%'] }} insets={insets}>
            <Stack.Navigator
                initialRouteName="main"
                screenOptions={{ contentStyle: { backgroundColor: color.White.toString() } }}
            >
                <Stack.Screen
                    name="main"
                    component={SharePostCommentPage}
                    options={{
                        headerTitle: '댓글',
                        header: BottomSheetHeader,
                    }}
                />
                <Stack.Screen
                    name="reply"
                    component={SharePostCommentReplyPage}
                    options={{
                        headerBackVisible: true,
                        headerTitle: '답글',
                        header: BottomSheetHeader,
                    }}
                />
            </Stack.Navigator>
        </BottomSheet>
    );
};

export default SharePostCommentBottomSheetRoutes;
