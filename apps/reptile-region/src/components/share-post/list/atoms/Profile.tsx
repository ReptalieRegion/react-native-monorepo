import { useNavigation } from '@react-navigation/native';
import { Typo } from 'design-system';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import type { SharePostListData } from '<SharePostAPI>';
import { SharePostNavigationProp } from '<SharePostRoutes>';

type ProfileProps = {
    user: Pick<SharePostListData['user'], 'profile' | 'nickname' | 'id'>;
};

const Profile = ({ user }: ProfileProps) => {
    const { id: userId, nickname, profile } = user;

    const navigation = useNavigation<SharePostNavigationProp<'share-post/list'>>();

    const gotoDetailPage = () => {
        navigation.push('share-post/detail', { userId, nickname });
    };

    return (
        <TouchableWithoutFeedback onPress={gotoDetailPage}>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{
                        uri: profile.src,
                    }}
                    priority="high"
                    contentFit="cover"
                />
                <Typo variant="title5">{user.nickname}</Typo>
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
