import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Typo, color } from '@reptile-region/design-system';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import type { MyTabParamList } from '<routes/bottom-tab>';
import type { RootRoutesParamList } from '<routes/root>';
import useSignOut from '@/apis/auth/hooks/mutations/useSignOut';
import { useFetchMeProfile } from '@/apis/me/profile/hooks';
import { Share } from '@/assets/icons';
import Diary from '@/assets/icons/Diary';
import { ConditionalRenderer, TextButton } from '@/components/@common/atoms';
import ListItem from '@/components/@common/molecules/ListItem/Item';
import { useAuth } from '@/components/auth/organisms/Auth/hooks/useAuth';
import { Profile } from '@/components/me/molecules/Profile';
import { useToast } from '@/overlay/Toast';

type MyListScreenProps = CompositeScreenProps<
    NativeStackScreenProps<MyTabParamList, 'my/list'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

export default function MyListPage({ navigation }: MyListScreenProps) {
    const { isSignIn, signOut } = useAuth();
    const { mutateAsync: signOutMutateAsync } = useSignOut();
    const { data } = useFetchMeProfile();
    const { openToast } = useToast();

    const navigateSignIn = () => {
        navigation.navigate('sign-in');
    };

    const navigateProfileSetting = () => {
        navigation.navigate('my/profile');
    };

    const handleKakaoLogout = async () => {
        try {
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
                <ConditionalRenderer
                    condition={isSignIn}
                    trueContent={<Profile user={data} />}
                    falseContent={<TextButton text="로그인/회원가입" type="view" color="surface" onPress={navigateSignIn} />}
                />
            </View>

            <View style={styles.activeContainer}>
                <Typo variant="heading2" color="placeholder">
                    활동
                </Typo>
                <View style={styles.testWrapper}>
                    <View style={styles.testContainer}>
                        <Share fill={color.Teal[150].toString()} />
                        <Typo textAlign="center" variant="heading3">
                            일상공유
                        </Typo>
                    </View>
                    <View style={styles.testContainer}>
                        <Diary />
                        <Typo textAlign="center" variant="heading3">
                            다이어리
                        </Typo>
                    </View>
                </View>
            </View>

            <View>
                <View style={styles.listTitle}>
                    <Typo variant="heading2" color="placeholder">
                        설정
                    </Typo>
                </View>
                <ListItem
                    leftChildren={<ListItem.Title text="푸시 알림 설정" />}
                    rightChildren={<ListItem.Chevron />}
                    onPress={navigateProfileSetting}
                />
                <ListItem
                    leftChildren={<ListItem.Title text="내 프로필 설정" />}
                    rightChildren={<ListItem.Chevron />}
                    onPress={navigateProfileSetting}
                />
            </View>

            <View>
                <View style={styles.listTitle}>
                    <Typo variant="heading2" color="placeholder">
                        약관
                    </Typo>
                </View>
                <ListItem
                    leftChildren={<ListItem.Title text="공지사항" />}
                    rightChildren={<ListItem.Chevron />}
                    onPress={navigateProfileSetting}
                />
                <ListItem
                    leftChildren={<ListItem.Title text="이용약관" />}
                    rightChildren={<ListItem.Chevron />}
                    onPress={navigateProfileSetting}
                />
                <ListItem
                    leftChildren={<ListItem.Title text="개인정보처리" />}
                    rightChildren={<ListItem.Chevron />}
                    onPress={navigateProfileSetting}
                />
            </View>

            <View>
                <View style={styles.listTitle}>
                    <Typo variant="heading2" color="placeholder">
                        정보
                    </Typo>
                </View>
                <ListItem
                    leftChildren={<ListItem.Title text="오픈소스" />}
                    rightChildren={<ListItem.Chevron />}
                    onPress={handleKakaoLogout}
                />
                <ListItem
                    leftChildren={<ListItem.Title text="앱 버전" />}
                    rightChildren={<ListItem.Chevron />}
                    onPress={handleKakaoLogout}
                />
            </View>

            <View>
                <View style={styles.listTitle}>
                    <Typo variant="heading2" color="placeholder">
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
        gap: 20,
        flexGrow: 1,
        paddingBottom: 20,
    },
    signContainer: {
        backgroundColor: color.White.toString(),
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    listTitle: {
        marginLeft: 20,
    },
    activeContainer: {
        gap: 5,
        paddingHorizontal: 20,
    },
    testWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
    },
    testContainer: {
        backgroundColor: color.BlueGray[50].toString(),
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderRadius: 5,
        paddingVertical: 10,
        gap: 10,
    },
});
