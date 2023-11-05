import { Typo, color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useFetchMeProfile } from '@/apis/me/profile/hooks';
import { Camera } from '@/assets/icons';
import { Avatar, TextButton } from '@/components/@common/atoms';

export default function ProfileSetting() {
    const { data } = useFetchMeProfile();

    const handlePressProfileImage = () => {};

    return (
        <View style={styles.container}>
            <View style={styles.profileWrapper}>
                <TouchableOpacity onPress={handlePressProfileImage}>
                    <View style={styles.profileContainer}>
                        <Avatar image={data?.profile} size={100} />
                        <View style={styles.cameraContainer}>
                            <Camera width={24} height={24} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.itemWrapper}>
                <View style={styles.itemContainer}>
                    <Typo variant="heading2">닉네임</Typo>
                    <View>
                        <Typo variant="body2" color="placeholder">
                            {data?.nickname}
                        </Typo>
                    </View>
                </View>
                <TextButton text="회원탈퇴" type="text" color="error" textAlign="right" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
        padding: 20,
    },
    profileWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    profileContainer: {
        position: 'relative',
    },
    cameraContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: color.Teal[150].toString(),
        borderRadius: 9999,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemWrapper: {
        gap: 10,
    },
    itemContainer: {
        gap: 8,
    },
});
