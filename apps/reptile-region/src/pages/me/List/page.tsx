import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Typo, color } from '@reptile-region/design-system';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import type { MyTabParamList } from '<routes/bottom-tab>';
import type { RootRoutesParamList } from '<routes/root>';
import useSignOut from '@/apis/auth/hooks/mutations/useSignOut';
import useDeleteFCMToken from '@/apis/me/profile/hooks/mutations/useDeleteFCMToken';
import useFetchMeProfile from '@/apis/me/profile/hooks/queries/useFetchMeProfile';
import useFetchPushAgree from '@/apis/notification/push/hooks/queries/useFetchPushAgree';
import { Share } from '@/assets/icons';
import Diary from '@/assets/icons/Diary';
import { ConditionalRenderer } from '@/components/@common/atoms';
import ListItem from '@/components/@common/molecules/ListItem/Item';
import { useToast } from '@/components/@common/organisms/Toast';
import { useAuth } from '@/components/auth/organisms/Auth/hooks/useAuth';
import { Profile } from '@/components/me/molecules/Profile';
import VersionCheck from '@/native-modules/version-check/VersionCheck';

type MyListScreenProps = CompositeScreenProps<
    NativeStackScreenProps<MyTabParamList, 'my/list'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

export default function MyListPage({ navigation }: MyListScreenProps) {
    const { isSignIn, signOut } = useAuth();
    const { mutateAsync: signOutMutateAsync } = useSignOut();
    const { mutateAsync: deleteFCMTokenMutateAsync } = useDeleteFCMToken();
    const { data } = useFetchMeProfile();
    useFetchPushAgree();
    const { openToast } = useToast();

    const navigateSharePostMe = () => {
        navigation.navigate('share-post/modal', {
            screen: 'detail/me',
        });
    };

    const navigateTermsOfUse = () => {
        navigation.navigate('my/terms-of-use');
    };

    const navigatePrivacyPolicy = () => {
        navigation.navigate('my/terms-privacy-policy');
    };

    const navigateProfileSetting = () => {
        navigation.navigate('my/profile');
    };

    const navigateLicense = () => {
        navigation.navigate('my/license');
    };

    const navigateNotificationSetting = () => {
        navigation.navigate('my/notification-setting');
    };

    const handleKakaoLogout = async () => {
        try {
            await deleteFCMTokenMutateAsync();
            await signOutMutateAsync();
            await signOut();
            navigation.navigate('bottom-tab/routes', {
                screen: 'tab',
                params: {
                    screen: 'home/routes',
                    params: {
                        screen: 'home/list',
                    },
                },
            });
            openToast({ contents: '로그아웃 성공', severity: 'success' });
        } catch (error) {
            openToast({ contents: '로그아웃 실패', severity: 'error' });
        }
    };

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

            <View style={styles.listContainer}>
                <View style={styles.listTitle}>
                    <Typo variant="title3" color="placeholder">
                        설정
                    </Typo>
                </View>
                <ListItem
                    leftChildren={<ListItem.Title text="푸시 알림 설정" />}
                    rightChildren={<ListItem.Chevron />}
                    onPress={navigateNotificationSetting}
                />
                <ListItem
                    leftChildren={<ListItem.Title text="내 프로필 설정" />}
                    rightChildren={<ListItem.Chevron />}
                    onPress={navigateProfileSetting}
                />
            </View>

            <View style={styles.listContainer}>
                <View style={styles.listTitle}>
                    <Typo variant="title3" color="placeholder">
                        약관
                    </Typo>
                </View>
                <ListItem leftChildren={<ListItem.Title text="공지사항" />} rightChildren={<ListItem.Chevron />} />
                <ListItem
                    leftChildren={<ListItem.Title text="이용약관" />}
                    rightChildren={<ListItem.Chevron />}
                    onPress={navigateTermsOfUse}
                />
                <ListItem
                    leftChildren={<ListItem.Title text="개인정보처리" />}
                    rightChildren={<ListItem.Chevron />}
                    onPress={navigatePrivacyPolicy}
                />
            </View>

            <View style={styles.listContainer}>
                <View style={styles.listTitle}>
                    <Typo variant="title3" color="placeholder">
                        정보
                    </Typo>
                </View>
                <ListItem
                    leftChildren={<ListItem.Title text="오픈소스" />}
                    rightChildren={<ListItem.Chevron />}
                    onPress={navigateLicense}
                />
                <ListItem
                    leftChildren={<ListItem.Title text="앱 버전" />}
                    rightChildren={
                        <View style={styles.marginRight}>
                            <Typo color="placeholder">{VersionCheck.getVersion()}</Typo>
                        </View>
                    }
                />
            </View>

            <View style={styles.listContainer}>
                <View style={styles.listTitle}>
                    <Typo variant="title3" color="placeholder">
                        계정
                    </Typo>
                </View>
                <ConditionalRenderer
                    condition={isSignIn}
                    trueContent={
                        <>
                            <ListItem
                                leftChildren={<ListItem.Title text="로그아웃" />}
                                rightChildren={<ListItem.Chevron />}
                                onPress={handleKakaoLogout}
                            />
                        </>
                    }
                    falseContent={null}
                />
            </View>
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
