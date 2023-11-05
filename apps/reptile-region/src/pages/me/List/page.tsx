import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import type { MyTabParamList } from '<routes/bottom-tab>';
import type { RootRoutesParamList } from '<routes/root>';
import useSignOut from '@/apis/auth/hooks/mutations/useSignOut';
import { useFetchMeProfile } from '@/apis/me/profile/hooks';
import { ConditionalRenderer, TextButton } from '@/components/@common/atoms';
import ListItem from '@/components/@common/molecules/ListItem/Item';
import { useAuth } from '@/components/auth/organisms/Auth/hooks/useAuth';
import { Profile } from '@/components/me/molecules/Profile';

type MyListScreenProps = CompositeScreenProps<
    NativeStackScreenProps<MyTabParamList, 'my/list'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

export default function MyListPage({ navigation }: MyListScreenProps) {
    const { isSignIn, signOut } = useAuth();
    const { mutateAsync: signOutMutateAsync } = useSignOut();
    const { data } = useFetchMeProfile();

    const navigateSignIn = () => {
        navigation.navigate('sign-in');
    };

    const handleKakaoLogout = async () => {
        try {
            await signOutMutateAsync();
            await signOut();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.signContainer}>
                <ConditionalRenderer
                    condition={isSignIn}
                    trueContent={<Profile user={data} />}
                    falseContent={<TextButton text="로그인/회원가입" type="view" color="surface" onPress={navigateSignIn} />}
                />
            </View>
            <ListItem leftChildren={<ListItem.Title text="내 프로필 설정" />} rightChildren={<ListItem.Chevron />} />
            <ConditionalRenderer
                condition={isSignIn}
                trueContent={
                    <ListItem
                        leftChildren={<ListItem.Title text="로그아웃" />}
                        rightChildren={<ListItem.Chevron />}
                        onPress={handleKakaoLogout}
                    />
                }
                falseContent={null}
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
