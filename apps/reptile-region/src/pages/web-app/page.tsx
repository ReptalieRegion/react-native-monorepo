import { color } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

export default function WebApp() {
    return (
        <View style={styles.wrapper}>
            <WebView source={{ uri: 'https://nextjs-abrowdnu2a-de.a.run.app' }} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
