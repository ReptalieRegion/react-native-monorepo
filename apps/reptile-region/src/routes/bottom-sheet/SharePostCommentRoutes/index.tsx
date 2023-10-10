import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomSheet } from 'bottom-sheet';
import { color } from 'design-system';
import React from 'react';
import { useAnimatedKeyboard } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SharePostCommentParamList } from '<routes/bottom-tab>';
import { BottomSheetHeader } from '@/components/@common/molecules';
import CommentPage from '@/pages/share-post/BottomSheet/Comment/MainPage';
import CommentReplyPage from '@/pages/share-post/BottomSheet/Comment/ReplyPage';

const Stack = createNativeStackNavigator<SharePostCommentParamList>();

export default function SharePostCommentRoutes({ navigation }: { navigation: any }) {
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
                    component={CommentPage}
                    options={{
                        headerTitle: '댓글',
                        header: BottomSheetHeader,
                    }}
                />
                <Stack.Screen
                    name="reply"
                    component={CommentReplyPage}
                    options={{
                        headerBackVisible: true,
                        headerTitle: '답글',
                        header: BottomSheetHeader,
                    }}
                />
            </Stack.Navigator>
        </BottomSheet>
    );
}
