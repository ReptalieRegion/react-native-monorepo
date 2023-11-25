import { Typo, color } from '@reptile-region/design-system';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import type { SettingList } from './type';

import useFetchMeProfile from '@/apis/me/profile/hooks/queries/useFetchMeProfile';
import useFetchPushAgree from '@/apis/notification/push/hooks/queries/useFetchPushAgree';
import { Share } from '@/assets/icons';
import Diary from '@/assets/icons/Diary';
import { ConditionalRenderer } from '@/components/@common/atoms';
import ListItem from '@/components/@common/molecules/ListItem/Item';
import { useAuth } from '@/components/auth/organisms/Auth/hooks/useAuth';
import { Profile } from '@/components/me/molecules/Profile';
import useMeActions from '@/hooks/me/actions/useMeActions';
import useMeListNavigation from '@/hooks/me/navigation/useMeListNavigation';
import VersionCheck from '@/native-modules/version-check/VersionCheck';

export default function MyListPage() {
    const { data } = useFetchMeProfile();
    useFetchPushAgree();

    const { isSignIn } = useAuth();
    const { logout } = useMeActions();

    const {
        navigateLicense,
        navigateNotificationSetting,
        navigatePrivacyPolicy,
        navigateProfileSetting,
        navigateSharePostMe,
        navigateTermsOfUse,
    } = useMeListNavigation();

    const settingList: SettingList[] = [
        {
            title: '설정',
            items: [
                {
                    title: '푸시 알림 설정',
                    rightChildren: 'Chevron',
                    showSignIn: false,
                    onPress: navigateNotificationSetting,
                },
                {
                    title: '내 프로필 설정',
                    rightChildren: 'Chevron',
                    showSignIn: false,
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
                    showSignIn: false,
                },
                {
                    title: '이용약관',
                    rightChildren: 'Chevron',
                    showSignIn: false,
                    onPress: navigateTermsOfUse,
                },
                {
                    title: '개인정보 취급방침',
                    rightChildren: 'Chevron',
                    showSignIn: false,
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
                    showSignIn: false,
                    onPress: navigateLicense,
                },
                {
                    title: '앱 버전',
                    rightChildren: VersionCheck.getVersion(),
                    showSignIn: false,
                },
            ],
        },
        {
            title: '계정',
            items: [
                {
                    title: '로그아웃',
                    rightChildren: 'Chevron',
                    showSignIn: true,
                    onPress: logout,
                },
            ],
        },
    ];

    console.log(settingList);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.signContainer}>
                <Profile user={data?.user} />
            </View>
            <View style={styles.activeContainer}>
                <Typo variant="title3" color="placeholder">
                    활동
                </Typo>
                <View style={styles.testWrapper}>
                    <TouchableOpacity containerStyle={styles.testContainer} onPress={navigateSharePostMe}>
                        <View style={styles.testContainerAlign}>
                            <Share fill={color.Teal[150].toString()} />
                            <Typo textAlign="center" variant="heading3">
                                일상공유
                            </Typo>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity containerStyle={styles.testContainer} onPress={navigateSharePostMe}>
                        <View style={styles.testContainerAlign}>
                            <Diary />
                            <Typo textAlign="center" variant="heading3">
                                다이어리
                            </Typo>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {settingList.map(({ title, items }) => (
                <View key={title} style={styles.listContainer}>
                    <View style={styles.listTitle}>
                        <Typo variant="title3" color="placeholder">
                            {title}
                        </Typo>
                    </View>
                    {items.map((item) => (
                        <ConditionalRenderer
                            condition={item.showSignIn}
                            trueContent={
                                <ConditionalRenderer
                                    condition={isSignIn}
                                    trueContent={
                                        <ListItem
                                            key={item.title}
                                            leftChildren={<ListItem.Title text={item.title} />}
                                            rightChildren={
                                                <ConditionalRenderer
                                                    condition={item.rightChildren === 'Chevron'}
                                                    trueContent={<ListItem.Chevron />}
                                                    falseContent={
                                                        <View style={styles.marginRight}>
                                                            <Typo color="placeholder">{item.rightChildren}</Typo>
                                                        </View>
                                                    }
                                                />
                                            }
                                            onPress={item.onPress}
                                        />
                                    }
                                    falseContent={null}
                                />
                            }
                            falseContent={
                                <ListItem
                                    key={item.title}
                                    leftChildren={<ListItem.Title text={item.title} />}
                                    rightChildren={
                                        <ConditionalRenderer
                                            condition={item.rightChildren === 'Chevron'}
                                            trueContent={<ListItem.Chevron />}
                                            falseContent={
                                                <View style={styles.marginRight}>
                                                    <Typo color="placeholder">{item.rightChildren}</Typo>
                                                </View>
                                            }
                                        />
                                    }
                                    onPress={item.onPress}
                                />
                            }
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
        gap: 5,
        flexGrow: 1,
        paddingBottom: 20,
    },
    signContainer: {
        backgroundColor: color.White.toString(),
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        height: 150,
    },
    listContainer: {
        paddingTop: 10,
        backgroundColor: color.White.toString(),
    },
    listTitle: {
        marginLeft: 20,
    },
    activeContainer: {
        gap: 5,
        paddingHorizontal: 20,
        backgroundColor: color.White.toString(),
        paddingVertical: 10,
    },
    testWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
    },
    testContainer: {
        backgroundColor: color.BlueGray[50].toString(),
        flex: 1,
        borderRadius: 5,
        paddingVertical: 10,
    },
    testContainerAlign: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    marginRight: {
        marginRight: 10,
    },
});
