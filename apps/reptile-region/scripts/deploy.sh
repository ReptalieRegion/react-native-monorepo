#!/bin/bash
VERSION=$*

MODE=$*
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${SCRIPT_DIR}/../ios/fastlane
fastlane beta version:${VERSION}
