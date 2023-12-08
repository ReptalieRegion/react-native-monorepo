import { BottomSheet } from '@reptile-region/bottom-sheet';
import React from 'react';

import EntityManagerOptionsMenu from './page';

import type { EntityManagerOptionsMenuScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerOptionsMenuPage(props: EntityManagerOptionsMenuScreenProps) {
    const closeMenu = () => {
        if (props.navigation.canGoBack()) {
            props.navigation.goBack();
        }
    };

    return (
        <BottomSheet onClose={closeMenu} snapInfo={{ startIndex: 0, pointsFromTop: [0] }}>
            <EntityManagerOptionsMenu {...props} />
        </BottomSheet>
    );
}
