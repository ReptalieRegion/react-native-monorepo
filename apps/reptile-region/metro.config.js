const path = require('path');

const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration test
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    watchFolders: [path.resolve(__dirname, '../../node_modules'), path.resolve(__dirname, '../../packages/overlay-manger')],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
