#!/bin/bash
MODE=$*
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [[ -z "$MODE" ]]
then
    export NODE_ENV=test
    sh $SCRIPT_DIR/set-env.sh test &&
    react-native start --reset-cache
elif [[ "$MODE" == "prod" ]]
then
    export NODE_ENV=production
    sh $SCRIPT_DIR/set-env.sh production
    react-native start --reset-cache
elif [[ "$MODE" == "dev" ]]
then
    export NODE_ENV=development
    sh $SCRIPT_DIR/set-env.sh development
    react-native start --reset-cache
else
    export NODE_ENV=test
    sh $SCRIPT_DIR/set-env.sh test
    react-native start --reset-cache
fi
