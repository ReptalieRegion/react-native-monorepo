module.exports = {
    transform: {
        '^.+\\.[jt]sx?$': ['babel-jest'],
    },
    moduleDirectories: ['node_modules', 'src'],
    testEnvironment: 'jsdom',
    testTimeout: 10000,
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/../../$1',
    },
    modulePathIgnorePatterns: ['<rootDir>/lib/'],
};
