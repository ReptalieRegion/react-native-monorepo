import React, { useRef } from 'react';
import { Button, SafeAreaView, StyleSheet } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '<Routes>';
import { useNavigation } from '@react-navigation/native';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomePage'>;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};

const getMessage = (event: WebViewMessageEvent) => {
    const data = event.nativeEvent.data;
    if (data === 'haptic') {
        ReactNativeHapticFeedback.trigger('impactLight', options);
    }
};

const HomePage = () => {
    const webviewRef = useRef<WebView>(null);
    const navigation = useNavigation<HomeScreenNavigationProp>();
    // const uri = 'http://localhost:3000';
    const uri = 'http://172.20.10.7:3000';

    return (
        <SafeAreaView style={styles.container}>
            <Button title="hi" onPress={() => navigation.push('ImageCropPage')} />
            <WebView ref={webviewRef} source={{ uri }} style={styles.container} onMessage={getMessage} />
        </SafeAreaView>
    );
};

export default HomePage;
