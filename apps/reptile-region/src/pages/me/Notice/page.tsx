import { color } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

export default function NoticePage() {
    return (
        <View style={styles.wrapper}>
            <WebView source={{ uri: 'https://nextjs-abrowdnu2a-de.a.run.app/notion/3ce984c24a8848de829e245c31b6da86' }} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
