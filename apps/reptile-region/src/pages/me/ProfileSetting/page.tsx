import { Typo } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import useFetchMeProfile from '@/apis/me/profile/hooks/queries/useFetchMeProfile';
import { TextButton } from '@/components/@common/atoms';
import { EditProfile } from '@/components/@common/molecules/Profile';
import PageWrapper from '@/components/PageWrapper';
import useProfileSettingActions from '@/pages/me/ProfileSetting/hooks/useProfileSettingActions';

export default function ProfileSetting() {
    const { data } = useFetchMeProfile();
    const { handlePressProfileImage, handlePressWithdrawal } = useProfileSettingActions();

    return (
        <PageWrapper style={styles.wrapper}>
            <EditProfile style={styles.profileWrapper} profile={data?.user.profile} onPress={handlePressProfileImage} />
            <View style={styles.itemWrapper}>
                <View style={styles.itemContainer}>
                    <Typo variant="heading2">닉네임</Typo>
                    <View>
                        <Typo variant="body2" color="placeholder">
                            {data?.user.nickname}
                        </Typo>
                    </View>
                </View>
                <TextButton text="회원탈퇴" type="text" color="error" textAlign="right" onPress={handlePressWithdrawal} />
            </View>
        </PageWrapper>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
    },
    profileWrapper: {
        marginBottom: 30,
    },
    itemWrapper: {
        gap: 40,
    },
    itemContainer: {
        gap: 8,
    },
});
