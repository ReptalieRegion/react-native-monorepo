import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Typo, color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import type { MyTabParamList } from '<routes/bottom-tab>';
import type { RootRoutesParamList } from '<routes/root>';
import { TextButton } from '@/components/@common/atoms';
import ListItem from '@/components/@common/molecules/ListItem/Item';
import { GoogleAuth } from '@/native-modules/google-auth/RNGoogleAuthModule';
import KakaoAuth from '@/native-modules/kakao-auth/KakaoAuth';

type MyListScreenProps = CompositeScreenProps<
    NativeStackScreenProps<MyTabParamList, 'my/list'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

export default function MyListPage({ navigation }: MyListScreenProps) {
    const navigateSignIn = () => {
        navigation.navigate('sign-in');
    };

    const navigateLicense = () => {
        navigation.navigate('my/license');
    };

    const handleKakaoLogout = async () => {
        try {
            await GoogleAuth.logout();
            await KakaoAuth.logout();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.signContainer}>
                <TextButton
                    type="view"
                    text="로그인/회원가입"
                    textInfo={{ color: 'surface', textAlign: 'center' }}
                    touchableProps={{ onPress: navigateSignIn }}
                />
            </View>
            <View>
                <ListItem leftChildren={<ListItem.Title text="앱푸시 알림 설정" />} rightChildren={<ListItem.Chevron />} />
                <ListItem leftChildren={<ListItem.Title text="내 프로필 설정" />} rightChildren={<ListItem.Chevron />} />
            </View>
            <View>
                <ListItem
                    leftChildren={<ListItem.Title text="공지사항" />}
                    rightChildren={<ListItem.Chevron />}
                    onPress={handleKakaoLogout}
                />
                <ListItem
                    leftChildren={<ListItem.Title text="이용약관" />}
                    rightChildren={<ListItem.Chevron />}
                    onPress={handleKakaoLogout}
                />
                <ListItem
                    leftChildren={<ListItem.Title text="개인정보 취급방침" />}
                    rightChildren={<ListItem.Chevron />}
                    onPress={handleKakaoLogout}
                />
            </View>
            <View>
                <ListItem
                    leftChildren={<ListItem.Title text="오픈소스 라이선스" />}
                    rightChildren={<ListItem.Chevron />}
                    onPress={navigateLicense}
                />
                <ListItem
                    leftChildren={<ListItem.Title text="버전정보" />}
                    rightChildren={
                        <View style={styles.marginRight}>
                            <Typo color="placeholder">1.0.0</Typo>
                        </View>
                    }
                    onPress={handleKakaoLogout}
                />
            </View>
            <ListItem
                leftChildren={<ListItem.Title text="로그아웃" />}
                rightChildren={<ListItem.Chevron />}
                onPress={handleKakaoLogout}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
    },
    signContainer: {
        backgroundColor: color.White.toString(),
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    marginRight: {
        marginRight: 10,
    },
});
