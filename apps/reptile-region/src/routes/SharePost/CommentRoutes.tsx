import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomSheet } from '@reptile-region/bottom-sheet';
import { color } from '@reptile-region/design-system';
import React from 'react';

import { BottomSheetHeader } from '@/components/@common/molecules';
import useKeyboardState, { UseKeyboardState } from '@/hooks/@common/useKeyboardState';
import CommentPage from '@/pages/share-post/CommentList/MainPage';
import CommentReplyPage from '@/pages/share-post/CommentList/ReplyPage';
import type { CommentParamList } from '@/types/routes/param-list/sharePost';

const Stack = createNativeStackNavigator<CommentParamList>();

export default function SharePostCommentRoutes({ navigation }: { navigation: any }) {
    const keyboardState = useKeyboardState();
    const isCloseKeyboard = keyboardState === UseKeyboardState.CLOSE || keyboardState === UseKeyboardState.UNKNOWN;

    const handleClose = () => {
        if (isCloseKeyboard) {
            navigation.goBack();
        }
    };

    return (
        <BottomSheet onClose={handleClose} snapInfo={{ startIndex: 1, pointsFromTop: ['60%', '100%'] }}>
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
                        gestureEnabled: isCloseKeyboard,
                        headerBackVisible: true,
                        headerTitle: '답글',
                        header: BottomSheetHeader,
                    }}
                />
            </Stack.Navigator>
        </BottomSheet>
    );
}
