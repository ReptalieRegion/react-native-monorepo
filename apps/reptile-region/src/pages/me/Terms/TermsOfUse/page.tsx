import React from 'react';
import WebView from 'react-native-webview';

import PageWrapper from '@/components/PageWrapper';
import ENV from '@/env';

export default function TermsOfUsePage() {
    return (
        <PageWrapper>
            <WebView source={{ uri: ENV.WEB_PAGE_URI + 'terms-of-use' }} />
        </PageWrapper>
    );
}
