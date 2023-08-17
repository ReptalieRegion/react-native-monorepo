import { useNavigation } from '@react-navigation/native';
import { deserializeRN, isNextModule, isRNModule, serializeRNReturn } from '@reptalieregion/webview-bridge';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView, { WebViewMessageEvent } from 'react-native-webview';

import { WebviewExampleStackNavigationProp } from '<RootRoutes>';
import { color } from '../../components/common/tokens/colors';
import ENV from '../../env';
import { WebviewBridgeRunner } from '../../utils/webview-bridge/react-native';
import WebviewBridgeManager from '../../utils/webview-bridge/utils/WebviewBridgeManager';

const HomePage = () => {
    const webviewRef = useRef<WebView>(null);
    const navigation = useNavigation<WebviewExampleStackNavigationProp>();
    const { top } = useSafeAreaInsets();
    const webviewBridgeManager = new WebviewBridgeManager(webviewRef);

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
                const result = await WebviewBridgeRunner<'webview-example'>({ message, navigation });
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
            <WebView
                overScrollMode="never"
                ref={webviewRef}
                source={{ uri: ENV.HOME_PAGE_URI }}
                style={styles.container}
                webviewDebuggingEnabled={true}
                onMessage={getMessage}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    keyboard: {
        width: '100%',
        backgroundColor: color.White.toString(),
    },
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
        overflow: 'hidden',
    },
});

export default HomePage;
