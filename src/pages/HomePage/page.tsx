import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { HomePageNavigationProp } from '<Routes>';
import { useNavigation } from '@react-navigation/native';
import HapticRunner from '@/utils/webview-bridge/Haptic';
import { deserialize } from '@reptalieregion/webview-bridge';
import NavigateRunner from '@/utils/webview-bridge/Navigate';
import CustomSafeArea from '@/components/ui/safe-area/CustomSafeArea';

const getMessage = (event: WebViewMessageEvent, navigation: HomePageNavigationProp) => {
    const message = deserialize(event.nativeEvent.data);
    if (message === null) {
        return;
    }

    const { module, command, data } = message;
    try {
        switch (module) {
            case 'Haptic':
                HapticRunner(command, data);
                break;
            case 'Navigation':
                NavigateRunner<'HomePage'>(command, data, navigation);
                break;
            default:
                throw new Error('[webview-bridge] not found module');
        }
    } catch (error) {
        console.error(error);
    }
};

const HomePage = () => {
    const webviewRef = useRef<WebView>(null);
    const navigation = useNavigation<HomePageNavigationProp>();
    const uri = 'http://172.20.10.7:3000';
    // const uri = 'http://172.20.10.4:3000';
    // const uri = 'http://192.168.1.91:3000';
    // const uri = 'http://localhost:3000';

    return (
        <CustomSafeArea>
            <WebView
                overScrollMode="never"
                ref={webviewRef}
                source={{ uri }}
                style={styles.container}
                webviewDebuggingEnabled={true}
                onMessage={(event) => getMessage(event, navigation)}
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
