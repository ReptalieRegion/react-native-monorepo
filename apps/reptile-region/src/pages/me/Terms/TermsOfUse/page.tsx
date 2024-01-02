import { color } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

import ENV from '@/env';

export default function TermsOfUsePage() {
    return (
        <View style={styles.wrapper}>
            <WebView source={{ uri: ENV.WEB_PAGE_URI + 'terms-of-use' }} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
