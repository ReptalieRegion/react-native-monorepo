import { BottomSheet } from '@crawl/bottom-sheet';
import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';

import PostOptionsMenuBottomSheet, { type PostOptionsMenuProps } from './PostOptionsMenu';

import { ConditionalRenderer } from '@/components/@common/atoms';

export default function usePostOptionsMenuBottomSheet() {
    const overlay = useOverlay();
    const openPostOptionsMenuBottomSheet = useCallback(
        ({ post }: Pick<PostOptionsMenuProps, 'post'>) => {
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
                                snapInfo={{ startIndex: 0, pointsFromTop: [post.isMine ? 59 + 38 * 2 : 59 + 38 * 1] }}
                            >
                                <PostOptionsMenuBottomSheet post={post} />
                            </BottomSheet>
                        }
                    />
                ));
            });
        },
        [overlay],
    );

    return openPostOptionsMenuBottomSheet;
}
