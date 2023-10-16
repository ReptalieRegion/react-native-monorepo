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

type MyListScreenProps = CompositeScreenProps<
    NativeStackScreenProps<MyTabParamList, 'my/list'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

export default function MyListPage({ navigation }: MyListScreenProps) {
    const navigateSignIn = () => {
        navigation.navigate('sign-in');
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
            <ListItem leftChildren={<ListItem.Title text="내 프로필 설정" />} rightChildren={<ListItem.Chevron />} />
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
