import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';

import Alert, { type AlertProps } from './Alert';

import { ConditionalRenderer } from '@/components/@common/atoms';

export default function useAlert(exitOnUnmount: boolean = false) {
    const overlay = useOverlay({ exitOnUnmount });
    const openAlert = useCallback(
        ({
            title,
            contents,
            buttons,
            isBackdropClosable,
        }: Pick<AlertProps, 'title' | 'contents' | 'buttons' | 'isBackdropClosable'>) => {
            return new Promise<boolean>((resolve) => {
                overlay.open(({ isOpen, close, exit }) => (
                    <ConditionalRenderer
                        condition={isOpen}
                        trueContent={
                            <Alert
                                buttons={buttons}
                                title={title}
                                contents={contents}
                                isBackdropClosable={isBackdropClosable}
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
