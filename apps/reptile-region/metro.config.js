const path = require('path');

const { mergeConfig } = require('@react-native/metro-config');
const { getDefaultConfig } = require('expo/metro-config');

/**
 * Metro configuration test
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    watchFolders: [
        path.resolve(__dirname, '../../node_modules'),
        path.resolve(__dirname, '../../packages/overlay-manager'),
        path.resolve(__dirname, '../../packages/bottom-sheet'),
        path.resolve(__dirname, '../../packages/design-system'),
    ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
