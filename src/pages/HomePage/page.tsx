import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { HomePageNavigationProp } from '<Routes>';
import { useNavigation } from '@react-navigation/native';
import CustomSafeArea from '@/components/ui/safe-area/CustomSafeArea';

import { deserializeMessage } from '@reptalieregion/webview-bridge';
import webviewBridgeRunner from '@/utils/webview-bridge';

const HomePage = () => {
    const webviewRef = useRef<WebView>(null);
    const navigation = useNavigation<HomePageNavigationProp>();
    // const uri = 'http://172.20.10.7:3000';
    // const uri = 'http://172.20.10.4:3000';
    // const uri = 'http://192.168.1.91:3000';
    const uri = 'http://localhost:3000';

    const getMessage = async (event: WebViewMessageEvent) => {
        const message = deserializeMessage(event.nativeEvent.data);
        if (message === null) {
            return;
        }

        const returnMessage = await webviewBridgeRunner<'HomePage'>({ message, navigation });
        if (returnMessage) {
            webviewRef.current?.postMessage(returnMessage);
        }
    };

    return (
        <CustomSafeArea>
            <WebView
                overScrollMode="never"
                ref={webviewRef}
                source={{ uri }}
                style={styles.container}
                webviewDebuggingEnabled={true}
                onMessage={getMessage}
                injectedJavaScript={'function test() {return }'}
            />
        </CustomSafeArea>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default HomePage;
