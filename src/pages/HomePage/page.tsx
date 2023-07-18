import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { HomePageNavigationProp } from '<Routes>';
import { useNavigation } from '@react-navigation/native';
import CustomSafeArea from '@/components/ui/safe-area/CustomSafeArea';

import { PostReturnType, deserializeMessage, serializeReturnMessage } from '@reptalieregion/webview-bridge';
import AsyncStorageRunner from '@/utils/webview-bridge/async-storage/AsyncStorageRunner';
import HapticRunner from '@/utils/webview-bridge/haptic/HapticRunner';
import NavigateRunner from '@/utils/webview-bridge/navigate/NavigateRunner';

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

        let result: PostReturnType | undefined;
        try {
            switch (message.module) {
                case 'Haptic':
                    result = HapticRunner(message);
                    break;
                case 'Navigation':
                    result = NavigateRunner<'HomePage'>({ message, navigation });
                    break;
                case 'AsyncStorage':
                    result = await AsyncStorageRunner(message);
                    break;
                default:
                    throw new Error('[webview-bridge] not found module');
            }

            if (result) {
                const returnMessage = serializeReturnMessage(result);
                webviewRef.current?.postMessage(returnMessage);
            }
        } catch (error) {
            console.error(error);
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
