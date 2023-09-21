import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Profile from '../atoms/Profile';

import type { ShareImageType } from '<Image>';
import { KebabMenu } from '@/assets/icons';

type PostModalHeaderProps = {
    user: {
        nickname: string;
        profile: ShareImageType;
    };
    handleProfilePress: () => void;
    handleKebabMenuPress: () => void;
};

const PostModalHeader = ({ user: { nickname, profile }, handleKebabMenuPress, handleProfilePress }: PostModalHeaderProps) => {
    return (
        <View style={styles.container}>
            <Profile onPress={handleProfilePress} user={{ nickname, profile }} />
            <View style={styles.rightContent}>
                <TouchableOpacity onPress={handleKebabMenuPress}>
                    <KebabMenu />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default PostModalHeader;
