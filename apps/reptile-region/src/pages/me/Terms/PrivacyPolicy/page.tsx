import { color } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

import useFetchWebView from '@/apis/web/queries/useFetchWebView';

export default function PrivacyPolicyPage() {
    const { data } = useFetchWebView('privacy-policy');

    return <View style={styles.wrapper}>{data ? <WebView source={{ html: data }} /> : null}</View>;
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
