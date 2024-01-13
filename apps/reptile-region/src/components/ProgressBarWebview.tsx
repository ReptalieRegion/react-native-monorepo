import { color } from '@crawl/design-system';
import { useOnOff } from '@crawl/react-hooks';
import React, { useCallback, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import WebView, { type WebViewProps } from 'react-native-webview';
import type { WebViewErrorEvent, WebViewNavigationEvent, WebViewProgressEvent } from 'react-native-webview/lib/WebViewTypes';

import { ConditionalRenderer } from './@common/atoms';
import PageWrapper from './PageWrapper';

type ProgressBarWebviewProps = {
    progressBar?: {
        color: string;
    };
};

export default function ProgressBarWebview({
    progressBar = {
        color: color.Teal[150].toString(),
    },
    onLoadEnd,
    onLoadStart,
    onLoadProgress,
    ...props
}: WebViewProps & ProgressBarWebviewProps) {
    const { width } = useWindowDimensions();
    const [percent, setPercent] = useState(0);
    const { off, on, state } = useOnOff();

    const _onLoadStart = useCallback(
        (event: WebViewNavigationEvent) => {
            on();
            onLoadStart?.(event);
        },
        [on, onLoadStart],
    );

    const _onLoadEnd = useCallback(
        (event: WebViewNavigationEvent | WebViewErrorEvent) => {
            setTimeout(off, 500);
            onLoadEnd?.(event);
        },
        [off, onLoadEnd],
    );

    const _onLoadProgress = useCallback(
        (syntheticEvent: WebViewProgressEvent) => {
            setPercent(syntheticEvent.nativeEvent.progress);
            onLoadProgress?.(syntheticEvent);
        },
        [onLoadProgress],
    );

    return (
        <PageWrapper>
            <ConditionalRenderer
                condition={state}
                trueContent={
                    <Progress.Bar width={width} height={2} progress={percent} color={progressBar.color} borderWidth={0} />
                }
            />
            <WebView onLoadStart={_onLoadStart} onLoadProgress={_onLoadProgress} onLoadEnd={_onLoadEnd} {...props} />
        </PageWrapper>
    );
}
