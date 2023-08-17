import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { BottomTabSharePostListNavigationProp } from '<BottomTabSharePostRoutes>';
import { SharePostListData } from '<SharePostListAPI>';

type ProfileProps = Pick<SharePostListData, 'profile' | 'nickname' | 'userId'>;

const Profile = ({ nickname, profile, userId }: ProfileProps) => {
    const navigation = useNavigation<BottomTabSharePostListNavigationProp>();

    const gotoDetailPage = () => {
        navigation.push('share-post/detail', { userId, nickname });
    };

    return (
        <TouchableWithoutFeedback onPress={gotoDetailPage}>
            <View style={styles.container}>
                <FastImage
                    style={styles.image}
                    source={{
                        uri: profile.src,
                        priority: FastImage.priority.high,
                        cache: FastImage.cacheControl.web,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <Text>{nickname}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 9999,
    },
});

export default Profile;
