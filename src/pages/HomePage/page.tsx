import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { HomePageNavigationProp } from '<Routes>';
import { useNavigation } from '@react-navigation/native';

import { deserializeRN, isNextModule, isRNModule, serializeRNReturn } from '@reptalieregion/webview-bridge';
import webviewBridgeRunner from '@/utils/webview-bridge';
import { HomeBottomBar } from '@/components/ui/layouts/BottomBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomePage = () => {
    const webviewRef = useRef<WebView>(null);
    const navigation = useNavigation<HomePageNavigationProp>();
    const { top } = useSafeAreaInsets();
    // const uri = 'http://172.20.10.7:3000';
    // const uri = 'http://172.20.10.4:3000';
    const uri = 'http://192.168.0.6:3000';
    // const uri = 'http://localhost:3000';

    const postMessage = (message: string) => {
        webviewRef.current?.postMessage(message);
    };

    const getMessage = async (event: WebViewMessageEvent) => {
        try {
            console.log(event.nativeEvent.data);
            const deserialized = deserializeRN(event.nativeEvent.data);
            if (deserialized === null) {
                return;
            }

            const { message, type } = deserialized;
            if (type === 'call' && isRNModule(message.module)) {
                const result = await webviewBridgeRunner<'HomePage'>({ message, navigation });
                if (result) {
                    const returnMessage = serializeRNReturn(result);
                    postMessage(returnMessage);
                }
            }

            if (type === 'return' && isNextModule(message.module)) {
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
                source={{ uri }}
                style={styles.container}
                webviewDebuggingEnabled={true}
                onMessage={getMessage}
            />
            <HomeBottomBar postMessage={postMessage} />
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
