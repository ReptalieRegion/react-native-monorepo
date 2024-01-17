import { BottomSheet } from '@crawl/bottom-sheet';
import { useOverlay } from '@crawl/overlay-manager';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';

import useBlockAlert from '../../../../@common/hooks/useBlockAlert';

import UserOptionsMenuBottomSheet from './UserOptionsMenu';

import { ConditionalRenderer } from '@/components/@common/atoms';
import type { RootRoutesParamList } from '@/types/routes/param-list';

export default function useUserOptionsMenuBottomSheet() {
    const overlay = useOverlay();
    const navigation = useNavigation<NativeStackNavigationProp<RootRoutesParamList>>();
    const openAlert = useBlockAlert({
        onSuccess: () => {
            navigation.navigate('bottom-tab/routes', {
                screen: 'tab',
                params: {
                    screen: 'share-post/routes',
                    params: {
                        screen: 'bottom-tab/list',
                    },
                },
            });
        },
    });

    const openUserOptionsMenuBottomSheet = useCallback(
        ({ nickname }: { nickname: string }) => {
            const listItem = [
                {
                    text: '차단하기',
                    onPress: () => {
                        openAlert(nickname);
                    },
                },
            ];

            const bottomSheetHeight = 59 + 38 * listItem.length;

            return new Promise<boolean>((resolve) => {
                overlay.open(({ isOpen, close }) => (
                    <ConditionalRenderer
                        condition={isOpen}
                        trueContent={
                            <BottomSheet
                                onClose={() => {
                                    close();
                                    resolve(false);
                                }}
                                snapInfo={{ startIndex: 0, pointsFromTop: [bottomSheetHeight] }}
                            >
                                <UserOptionsMenuBottomSheet listItem={listItem} bottomSheetHeight={bottomSheetHeight} />
                            </BottomSheet>
                        }
                    />
                ));
            });
        },
        [openAlert, overlay],
    );

    return openUserOptionsMenuBottomSheet;
}
