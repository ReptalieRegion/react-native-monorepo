import { Typo, color } from '@reptile-region/design-system';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { useFetchMeProfile } from '@/apis/me/profile/hooks';
import { Camera } from '@/assets/icons';
import { Avatar, TextButton } from '@/components/@common/atoms';
import { photoPermissionCheck } from '@/utils/permissions/photo-permission';

export default function ProfileSetting() {
    const { data } = useFetchMeProfile();

    const handlePressProfileImage = async () => {
        const hasPermission = await photoPermissionCheck();
        if (hasPermission) {
            Alert.alert(
                '뭘로 올릴래?',
                '선택해',
                [
                    {
                        text: '카메라로 찍기',
                        onPress: async () => {
                            const result = await launchCamera({
                                mediaType: 'photo',
                                cameraType: 'back',
                            });

                            if (result.didCancel) {
                                return null;
                            }

                            const localUri = result.assets?.[0].uri;
                            const uriPath = localUri?.split('//').pop();
                            const imageName = localUri?.split('/').pop();
                            console.log(uriPath, imageName);
                            return;
                        },
                    },
                    {
                        text: '앨범에서 선택',
                        onPress: async () => {
                            const result = await launchImageLibrary({ mediaType: 'photo' });
                            if (result.didCancel) {
                                return null;
                            }
                            const localUri = result?.assets?.[0].uri;
                            const uriPath = localUri?.split('//').pop();
                            const imageName = localUri?.split('/').pop();
                            console.log(uriPath, imageName);
                            return;
                        },
                    },
                ],
                { cancelable: false },
            );
        }
    };

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
