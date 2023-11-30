import { Typo, color } from '@reptile-region/design-system';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import type { SettingList } from './type';

import useFetchMeProfile from '@/apis/me/profile/hooks/queries/useFetchMeProfile';
import useFetchPushAgree from '@/apis/notification/push/hooks/queries/useFetchPushAgree';
import { ConditionalRenderer } from '@/components/@common/atoms';
import { Divider } from '@/components/@common/atoms/Divider';
import ListItem from '@/components/@common/molecules/ListItem/Item';
import { Profile } from '@/components/@common/molecules/Profile';
import useMeActions from '@/hooks/me/actions/useMeActions';
import useMeListNavigation from '@/hooks/me/navigation/useMeListNavigation';
import VersionCheck from '@/native-modules/version-check/VersionCheck';

export default function MyListPage() {
    const { data } = useFetchMeProfile();
    useFetchPushAgree();

    const { logout } = useMeActions();

    const { navigateLicense, navigateNotificationSetting, navigatePrivacyPolicy, navigateProfileSetting, navigateTermsOfUse } =
        useMeListNavigation();

    const settingList: SettingList[] = [
        {
            title: '설정',
            items: [
                {
                    title: '푸시 알림 설정',
                    rightChildren: 'Chevron',
                    onPress: navigateNotificationSetting,
                },
                {
                    title: '내 프로필 설정',
                    rightChildren: 'Chevron',
                    onPress: navigateProfileSetting,
                },
            ],
        },
        {
            title: '약관',
            items: [
                {
                    title: '공지사항',
                    rightChildren: 'Chevron',
                },
                {
                    title: '이용약관',
                    rightChildren: 'Chevron',
                    onPress: navigateTermsOfUse,
                },
                {
                    title: '개인정보 취급방침',
                    rightChildren: 'Chevron',
                    onPress: navigatePrivacyPolicy,
                },
            ],
        },
        {
            title: '정보',
            items: [
                {
                    title: '오픈소스',
                    rightChildren: 'Chevron',
                    onPress: navigateLicense,
                },
                {
                    title: '앱 버전',
                    rightChildren: VersionCheck.getVersion(),
                },
            ],
        },
        {
            title: '계정',
            items: [
                {
                    title: '로그아웃',
                    rightChildren: 'Chevron',
                    onPress: logout,
                },
            ],
        },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.signContainer}>
                <Profile user={data?.user} />
            </View>
            <Divider height={10} />
            {settingList.map(({ title, items }) => (
                <View key={title} style={styles.listContainer}>
                    <View style={styles.listTitle}>
                        <Typo variant="title3" color="placeholder">
                            {title}
                        </Typo>
                    </View>
                    {items.map(({ title: subTitle, rightChildren, onPress }) => (
                        <ListItem
                            key={subTitle}
                            leftChildren={<ListItem.Title text={subTitle} />}
                            rightChildren={
                                <ConditionalRenderer
                                    condition={rightChildren === 'Chevron'}
                                    trueContent={<ListItem.Chevron />}
                                    falseContent={
                                        <View style={styles.listMargin}>
                                            <Typo color="placeholder">{rightChildren}</Typo>
                                        </View>
                                    }
                                />
                            }
                            onPress={onPress}
                        />
                    ))}
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    scrollViewContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    signContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        height: 170,
        marginBottom: 10,
    },
    listContainer: {
        paddingTop: 20,
        backgroundColor: color.White.toString(),
    },
    listTitle: {
        marginLeft: 20,
    },
    listMargin: {
        marginRight: 10,
    },
});
