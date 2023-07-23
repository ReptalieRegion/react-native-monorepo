import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { HomePageNavigationProp } from '<Routes>';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { deserializeRN, isNextModule, isRNModule, serializeRNReturn } from '@reptalieregion/webview-bridge';
import { HomeBottomBar } from '@/components/ui/layouts/BottomBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebviewBridgeManager from '@/utils/webview-bridge/utils/WebviewBridgeManager';
import CustomNextJSNavigation from '@/utils/webview-bridge/nextjs/navigation/Navigation';
import { WebviewBridgeRunner } from '@/utils/webview-bridge/react-native';
import Header from '@/components/ui/header/Header';
import { HOME_PAGE_URI } from '@env';

const HomePage = () => {
    const webviewRef = useRef<WebView>(null);
    const navigation = useNavigation<HomePageNavigationProp>();
    const { top } = useSafeAreaInsets();
    const webviewBridgeManager = new WebviewBridgeManager(webviewRef);
    const nextJSNavigation = CustomNextJSNavigation(webviewBridgeManager);

    const postMessage = (message: string) => {
        webviewRef.current?.postMessage(message);
    };

    const getMessage = async (event: WebViewMessageEvent) => {
        try {
            const data = event.nativeEvent.data;
            const deserialized = deserializeRN(data);
            if (deserialized === null) {
                return;
            }

            const { message, type } = deserialized;
            if (type === 'call' && isRNModule(message.module)) {
                const result = await WebviewBridgeRunner<'HomePage'>({ message, navigation });
                if (result.payload) {
                    const returnMessage = serializeRNReturn(result);
                    postMessage(returnMessage);
                }
                return;
            }

            if (type === 'return' && isNextModule(message.module)) {
                webviewBridgeManager.notifyObservers(message);
                return;
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={[styles.container, { paddingTop: top }]}>
            <Header leftIcon="logo" leftIconClick={() => nextJSNavigation.replace({ href: '/home' })} />
            <WebView
                overScrollMode="never"
                ref={webviewRef}
                source={{ uri: HOME_PAGE_URI }}
                style={styles.container}
                webviewDebuggingEnabled={true}
                onMessage={getMessage}
            />
            <HomeBottomBar nextJSNavigation={nextJSNavigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    keyboard: {
        width: '100%',
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        overflow: 'hidden',
    },
});

export default HomePage;
