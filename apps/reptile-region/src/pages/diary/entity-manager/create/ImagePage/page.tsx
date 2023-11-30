import { color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { EditProfile } from '@/components/@common/molecules/Profile';
import TitleAndDescription from '@/components/diary/TitleAndDescription/TitleAndDescription';
import useEntityMangerImageAction from '@/hooks/diary/actions/useEntityMangerImageAction';

export default function EntityManagerImagePage() {
    const { handlePressProfileImage } = useEntityMangerImageAction();

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <TitleAndDescription title="이미지를 등록해주세요" description="등록할 개체의 이미지를 선택해주세요." />
                <EditProfile
                    imageSize={200}
                    profile={{ src: '' }}
                    onPress={() => {
                        handlePressProfileImage();
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.White.toString(),
    },
    item: {
        justifyContent: 'flex-start',
        gap: 40,
    },
});
