#!/bin/bash
VERSION=$*
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

sh ./scripts/set-env.sh production
node ./scripts/extract-licenses/index.js
cd ${SCRIPT_DIR}/../ios/fastlane
fastlane beta version:${VERSION}
