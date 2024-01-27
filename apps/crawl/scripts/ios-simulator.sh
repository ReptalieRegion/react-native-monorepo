#!/bin/bash
SCHEME=$1
MODE=$2
VERSION=$3

if [[ -z "$VERSION" ]]
then
    yarn react-native run-ios --scheme $SCHEME --mode $MODE --simulator iPhone SE
else
    yarn react-native run-ios --scheme $SCHEME --mode $MODE --simulator "iPhone $VERSION"
fi
