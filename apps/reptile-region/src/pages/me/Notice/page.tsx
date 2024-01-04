import React from 'react';
import WebView from 'react-native-webview';

import PageWrapper from '@/components/PageWrapper';

export default function NoticePage() {
    return (
        <PageWrapper>
            <WebView source={{ uri: 'https://nextjs-abrowdnu2a-de.a.run.app/notion/3ce984c24a8848de829e245c31b6da86' }} />
        </PageWrapper>
    );
}
