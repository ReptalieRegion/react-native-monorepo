#!/bin/bash
MODE=$1
VERSION=$2
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

node ./scripts/extract-licenses/index.js
cd ${SCRIPT_DIR}/../ios/fastlane

if [[ -z "$VERSION" ]]
then
    fastlane ${MODE}
else
    fastlane ${MODE} version:${VERSION}
fi


