import { SharePostWritePageNavigationProp } from '<Routes>';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const SharePostWriteRightHeader = () => {
    const navigate = useNavigation<SharePostWritePageNavigationProp>();

    return (
        <TouchableOpacity onPress={() => navigate.popToTop()}>
            <Text>등록</Text>
        </TouchableOpacity>
    );
};

export default SharePostWriteRightHeader;
