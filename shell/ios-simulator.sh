version=$*

if [[ -z "$version" ]]
then
    yarn react-native run-ios --simulator="iPhone SE"  
else
    yarn react-native run-ios --simulator="iPhone $version"
fi
