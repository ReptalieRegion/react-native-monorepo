import { BottomSheet } from '@crawl/bottom-sheet';
import React from 'react';

import EntityManagerOptionsMenu from './page';

import type { EntityManagerOptionsMenuScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerOptionsMenuPage(props: EntityManagerOptionsMenuScreenProps) {
    const closeMenu = () => {
        if (props.navigation.canGoBack()) {
            props.navigation.goBack();
        }
    };

    const bottomSheetHeight = 59 + 38 * 2;

    return (
        <BottomSheet onClose={closeMenu} snapInfo={{ startIndex: 0, pointsFromTop: [bottomSheetHeight] }}>
            <EntityManagerOptionsMenu {...props} />
        </BottomSheet>
    );
}
