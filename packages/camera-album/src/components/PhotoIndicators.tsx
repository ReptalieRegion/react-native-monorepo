import { Typo, color } from '@crawl/design-system';
import React, { useMemo } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import usePhotoSelect from '../hooks/usePhotoSelect';

type PhotoIndicatorType = 'SELECTED_PHOTO' | 'OTHER_PHOTO';

export default function PhotoIndicators({ uri }: { uri: string }) {
    const { currentSelectedPhoto, selectedPhotos } = usePhotoSelect();
    const selectedIndex = selectedPhotos.findIndex((photo) => photo.uri === uri);
    const selectedType: PhotoIndicatorType = selectedIndex !== -1 ? 'SELECTED_PHOTO' : 'OTHER_PHOTO';

    const colorStyles: StyleProp<ViewStyle> = useMemo(() => [styles.circle, generateStyle(selectedType)], [selectedType]);
    const isCurrentSelectedPhoto = selectedPhotos.length !== 0 && currentSelectedPhoto?.uri === uri;

    return (
        <View style={styles.container}>
            <View style={colorStyles}>
                {selectedType === 'SELECTED_PHOTO' ? (
                    <Typo variant="body2" color="surface">
                        {selectedIndex + 1}
                    </Typo>
                ) : null}
            </View>
            {isCurrentSelectedPhoto ? <View style={styles.blur} /> : null}
        </View>
    );
}

function generateStyle(selectedType: PhotoIndicatorType) {
    switch (selectedType) {
        case 'SELECTED_PHOTO':
            return {
                backgroundColor: color.Green['750'].toString(),
                borderColor: color.Green['750'].toString(),
            };
        case 'OTHER_PHOTO':
            return {
                backgroundColor: color.Gray['350'].alpha(0.66).toString(),
                borderColor: color.White.toString(),
            };
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-end',
        width: '100%',
        height: '100%',
    },
    circle: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 9999,
        zIndex: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    blur: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: color.White.alpha(0.5).toString(),
    },
});
