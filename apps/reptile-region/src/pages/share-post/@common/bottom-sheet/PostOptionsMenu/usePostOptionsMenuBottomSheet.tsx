import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';

import PostOptionsMenuBottomSheet, { type PostOptionsMenuProps } from './PostOptionsMenu';

export default function usePostOptionsMenuBottomSheet() {
    const overlay = useOverlay();
    const openPostOptionsMenuBottomSheet = useCallback(
        ({ post }: Pick<PostOptionsMenuProps, 'post'>) => {
            return new Promise<boolean>((resolve) => {
                overlay.open(({ isOpen, close }) => (
                    <PostOptionsMenuBottomSheet
                        isOpen={isOpen}
                        post={post}
                        onClose={() => {
                            resolve(false);
                            close();
                        }}
                    />
                ));
            });
        },
        [overlay],
    );

    return openPostOptionsMenuBottomSheet;
}
