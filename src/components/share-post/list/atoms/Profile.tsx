import React from 'react';
import { SharePostsData } from '<SharePostAPI>';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SharePostListNavigationProp } from '<Routes>';

type ProfileProps = Pick<SharePostsData, 'profile' | 'name' | 'userId'>;

const Profile = ({ name, profile, userId }: ProfileProps) => {
    const navigation = useNavigation<SharePostListNavigationProp>();

    const gotoDetailPage = () => {
        navigation.push('share-post/detail', { userId, name });
    };

    return (
        <TouchableOpacity onPress={gotoDetailPage} activeOpacity={1}>
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
        </TouchableOpacity>
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
