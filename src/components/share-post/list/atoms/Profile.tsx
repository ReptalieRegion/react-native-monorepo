import React from 'react';
import { SharePostsData } from '<SharePostAPI>';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SharePostListNavigationProp } from '<Routes>';

type ProfileProps = Pick<SharePostsData, 'profile' | 'name' | 'userId'>;

const Profile = ({ name, profile, userId }: ProfileProps) => {
    const navigation = useNavigation<SharePostListNavigationProp>();

    const gotoDetailPage = () => {
        navigation.push('share-post/detail', { userId });
    };

    return (
        <TouchableWithoutFeedback onPress={gotoDetailPage}>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{
                        uri: profile.src,
                        width: 30,
                        height: 30,
                    }}
                    alt={profile.alt}
                    resizeMode="cover"
                />
                <Text>{name}</Text>
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
