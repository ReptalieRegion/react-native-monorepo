const fs = require('fs');
const path = require('path');

const glob = require('glob');

const homepageParse = require('./homepageParse');

// 모노레포 루트 디렉토리
const root = path.resolve(__dirname, '../../../..');
const currentSpace = path.resolve(__dirname, '../..');
const packages = path.resolve(root, 'packages');
const nodeModulesDir = path.join(root, 'node_modules');

const workspaces = fs
    .readdirSync(packages)
    .map((p) => path.join(packages, p))
    .filter((p) => fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'package.json')))
    .concat(currentSpace);

const modules = workspaces
    .flatMap((it) => {
        const pak = JSON.parse(fs.readFileSync(path.join(it, 'package.json'), 'utf8'));
        return pak.peerDependencies ? Object.keys(pak.peerDependencies) : pak.dependencies ? Object.keys(pak.dependencies) : [];
    })
    .filter((m, i, self) => {
        return self.lastIndexOf(m) === i && !m.startsWith('@reptile-region/');
    });

const license = modules.map((module) => {
    const pak = fs.readFileSync(path.join(nodeModulesDir, module, 'package.json'), 'utf-8');
    const licenseFiles = glob.sync(path.join(nodeModulesDir, module, '{LICEN[SC]E,[Ll]icen[sc]e}*'));
    const packageJson = JSON.parse(pak);

    const libraryName = packageJson.name || '';
    const description = packageJson.description || '';
    const _license = packageJson.license;
    const licenseType = typeof _license === 'string' ? _license : typeof _license === 'object' ? _license.type : null;
    const homepage = homepageParse(packageJson);

    if (licenseFiles.length > 0) {
        const licenseContent = fs.readFileSync(licenseFiles[0], 'utf-8');
        return {
            libraryName,
            description,
            licenseType,
            licenseContent,
            homepage,
        };
    }

    return {
        libraryName,
        description,
        licenseType,
        homepage,
    };
});

fs.writeFileSync(
    path.join(currentSpace, 'src/json/license.json'),
    JSON.stringify(license.sort((a, b) => (a.libraryName > b.libraryName ? 1 : -1))),
);
