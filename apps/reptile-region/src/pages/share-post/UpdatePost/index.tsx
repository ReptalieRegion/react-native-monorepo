import { NativeStackHeaderProps, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { RootRoutesParamList } from '<routes/root>';
import { createNativeStackHeader } from '@/components/@common/molecules';
import SharePostUpdate from '@/components/share/organisms/PostUpdate/PostUpdate';

type SharePostUpdateScreen = NativeStackScreenProps<RootRoutesParamList, 'share-post/post/update'>;

export function SharePostUpdateHeader(props: NativeStackHeaderProps) {
    return createNativeStackHeader({ leftIcon: 'cancel', title: '정보 수정' })(props);
}

export default function SharePostUpdatePage(props: SharePostUpdateScreen) {
    return (
        <View style={styles.container}>
            <SharePostUpdate {...props} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
