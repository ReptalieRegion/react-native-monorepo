function homepageParse(packageJson) {
    if (packageJson.homepage) {
        return packageJson.homepage;
    } else if (packageJson.repository && packageJson.repository.url) {
        return packageJson.repository.url;
    } else if (typeof packageJson.repository === 'string' && packageJson.repository.startsWith('github:')) {
        return 'https://github.com/' + packageJson.repository.replace('github:', '');
    } else {
        return undefined;
    }
}

module.exports = homepageParse;
