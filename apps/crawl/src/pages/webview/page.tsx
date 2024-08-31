import React from 'react';

import ProgressBarWebview from '@/components/ProgressBarWebview';
import type { WebviewScreenProps } from '@/types/routes/props/webview';

export default function WebviewPage(props?: WebviewScreenProps) {
    return <ProgressBarWebview {...props?.route.params} decelerationRate={1.2} />;
}
