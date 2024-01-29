import { CameraAlbum, PhotoList } from '@crawl/camera-album';
import React, { useMemo } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { openPhotoPicker } from 'react-native-permissions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CameraAlbumPage() {
    const { top } = useSafeAreaInsets();
    const wrapperStyle = useMemo(() => [{ paddingTop: top }, styles.wrapper], [top]);

    return (
        <View style={wrapperStyle}>
            <CameraAlbum>
                <CameraActionButtons />
                <PhotoList pageSize={96} />
            </CameraAlbum>
        </View>
    );
}

function CameraActionButtons() {
    return (
        <View>
            <Button title="앨범" onPress={openPhotoPicker} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
});
