import React from 'react';
import WebView from 'react-native-webview';

import PageWrapper from '@/components/PageWrapper';
import ENV from '@/env';

export default function HomePage() {
    return (
        <PageWrapper>
            <WebView source={{ uri: ENV.HOME_PAGE_URI }} />
        </PageWrapper>
    );
}
