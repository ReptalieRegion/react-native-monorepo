/**
 * @format
 */

import { AppRegistry } from 'react-native';

import App from './App';
import { name as appName } from './app.json';

if (__DEV__) {
    import('react-native-url-polyfill/auto').then(() => {
        import('./src/mocks/native').then(({ native }) => {
            native.listen();
        });
    });
}

AppRegistry.registerComponent(appName, () => App);
