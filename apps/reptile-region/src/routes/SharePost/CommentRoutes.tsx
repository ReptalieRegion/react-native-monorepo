import { BottomSheet } from '@crawl/bottom-sheet';
import { color } from '@crawl/design-system';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { BottomSheetHeader } from '@/components/@common/molecules';
import useKeyboardState, { UseKeyboardState } from '@/hooks/useKeyboardState';
import { SharePostCommentPage } from '@/pages/share-post/CommentList/MainPage';
import { SharePostCommentReplyPage } from '@/pages/share-post/CommentList/ReplyPage';
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
                screenOptions={{ contentStyle: { flex: 1, backgroundColor: color.White.toString() } }}
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
