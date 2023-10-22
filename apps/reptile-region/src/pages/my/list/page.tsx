import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import type { MyTabParamList } from '<routes/bottom-tab>';
import type { RootRoutesParamList } from '<routes/root>';
import { TextButton } from '@/components/@common/atoms';
import ListItem from '@/components/@common/molecules/ListItem/Item';
import KakaoAuth from '@/native-modules/kakao-auth/KakaoAuth';

type MyListScreenProps = CompositeScreenProps<
    NativeStackScreenProps<MyTabParamList, 'my/list'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

export default function MyListPage({ navigation }: MyListScreenProps) {
    const navigateSignIn = () => {
        navigation.navigate('sign-in');
    };

    const handleKakaoLogin = async () => {
        try {
            await KakaoAuth.login();
            const profile = await KakaoAuth.getProfile();
            console.log('hi2', JSON.stringify(profile));
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleKakaoLogout = async () => {
        try {
            await KakaoAuth.logout();
            console.log('success');
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
                <TextButton
                    type="view"
                    text="카카오"
                    textInfo={{ color: 'surface', textAlign: 'center' }}
                    touchableProps={{ onPress: handleKakaoLogin }}
                />
            </View>
            <ListItem leftChildren={<ListItem.Title text="내 프로필 설정" />} rightChildren={<ListItem.Chevron />} />
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
});
