const path = require('path');
const fs = require('fs');
const escape = require('escape-string-regexp');
const { mergeConfig } = require('@react-native/metro-config');
const { getDefaultConfig } = require('@expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const root = path.resolve(__dirname, '../..');
const packages = path.resolve(root, 'packages');

const defaultConfig = getDefaultConfig(__dirname);

const workspaces = fs
    .readdirSync(packages)
    .map((p) => path.join(packages, p))
    .filter((p) => fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'package.json')));

const modules = workspaces
    .flatMap((it) => {
        const pak = JSON.parse(fs.readFileSync(path.join(it, 'package.json'), 'utf8'));

        return pak.peerDependencies ? Object.keys(pak.peerDependencies) : [];
    })
    .sort()
    .filter((m, i, self) => {
        return self.lastIndexOf(m) === i && !m.startsWith('@crawl/');
    });

/**
 * Metro configuration test
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    projectRoot: __dirname,
    watchFolders: [root],

    resolver: {
        blacklistRE: exclusionList(
            [].concat(
                ...workspaces.map((it) => modules.map((m) => new RegExp(`^${escape(path.join(it, 'node_modules', m))}\\/.*$`))),
            ),
        ),

        extraNodeModules: modules.reduce((acc, name) => {
            acc[name] = path.join(root, 'node_modules', name);
            return acc;
        }, {}),
    },
};

module.exports = mergeConfig(defaultConfig, config);
