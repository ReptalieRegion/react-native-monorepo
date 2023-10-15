#!/bin/bash
VERSION=$*

if [[ -z "$VERSION" ]]
then
    yarn react-native run-ios --simulator="iPhone SE"  
else
    yarn react-native run-ios --simulator="iPhone $VERSION"
fi
