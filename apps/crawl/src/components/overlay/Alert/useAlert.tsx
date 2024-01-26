import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';

import Alert, { type AlertProps } from './Alert';

import { ConditionalRenderer } from '@/components/@common/atoms';

export default function useAlert() {
    const overlay = useOverlay({ exitOnUnmount: false });
    const openAlert = useCallback(
        ({ title, contents, buttons }: Pick<AlertProps, 'title' | 'contents' | 'buttons'>) => {
            return new Promise<boolean>((resolve) => {
                overlay.open(({ isOpen, close, exit }) => (
                    <ConditionalRenderer
                        condition={isOpen}
                        trueContent={
                            <Alert
                                buttons={buttons}
                                title={title}
                                contents={contents}
                                onClose={() => {
                                    resolve(false);
                                    close();
                                    exit();
                                }}
                            />
                        }
                    />
                ));
            });
        },
        [overlay],
    );

    return openAlert;
}
