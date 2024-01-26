module.exports = {
    presets: ['babel-preset-expo'],
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    '@': './src',
                },
            },
        ],
        [
            'module:react-native-dotenv',
            {
                envName: 'APP_ENV',
                moduleName: '@env',
                path: `.env.${process.env.NODE_ENV}`,
                safe: false,
                allowUndefined: false,
            },
        ],
        [
            'react-native-reanimated/plugin',
            {
                relativeSourceLocation: true,
            },
        ],
    ],
};
