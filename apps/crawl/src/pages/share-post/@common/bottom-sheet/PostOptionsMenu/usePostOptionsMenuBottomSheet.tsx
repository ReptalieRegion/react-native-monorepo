import { BottomSheet } from '@crawl/bottom-sheet';
import { useOverlay } from '@crawl/overlay-manager';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

import PostOptionsMenuBottomSheet, { type PostOptionsMenuProps } from './PostOptionsMenu';

import { ConditionalRenderer } from '@/components/@common/atoms';
import type { SharePostListNavigationProp } from '@/types/routes/props/share-post/post-list';

export default function usePostOptionsMenuBottomSheet() {
    const overlay = useOverlay();
    const navigation = useNavigation<SharePostListNavigationProp>();

    const openPostOptionsMenuBottomSheet = useCallback(
        ({ post, onSuccessDelete }: Pick<PostOptionsMenuProps, 'post' | 'onSuccessDelete'>) => {
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
                                snapInfo={{ startIndex: 0, pointsFromTop: [59 + 38 * 2] }}
                            >
                                <PostOptionsMenuBottomSheet
                                    navigation={navigation}
                                    post={post}
                                    onSuccessDelete={onSuccessDelete}
                                />
                            </BottomSheet>
                        }
                    />
                ));
            });
        },
        [navigation, overlay],
    );

    return openPostOptionsMenuBottomSheet;
}
