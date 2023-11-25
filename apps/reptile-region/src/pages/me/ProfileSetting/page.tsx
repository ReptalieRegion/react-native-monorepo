import { Typo, color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import useFetchMeProfile from '@/apis/me/profile/hooks/queries/useFetchMeProfile';
import { TextButton } from '@/components/@common/atoms';
import { EditProfile } from '@/components/me/molecules/Profile';
import useProfileSetting from '@/hooks/me/actions/useProfileSetting';

export default function ProfileSetting() {
    const { data } = useFetchMeProfile();
    const { handlePressProfileImage } = useProfileSetting();

    return (
        <View style={styles.container}>
            <View style={styles.profileWrapper}>
                <EditProfile profile={data?.user.profile} onPress={handlePressProfileImage} />
            </View>
            <View style={styles.itemWrapper}>
                <View style={styles.itemContainer}>
                    <Typo variant="heading2">닉네임</Typo>
                    <View>
                        <Typo variant="body2" color="placeholder">
                            {data?.user.nickname}
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
    itemWrapper: {
        gap: 10,
    },
    itemContainer: {
        gap: 8,
    },
});
