import { Typo, color } from 'design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import usePhotoSelect from '../../hooks/usePhotoSelect';

import { ConditionalRenderer } from '@/components/@common/atoms';

type PhotoIndicatorsProps = {
    uri: string;
};

type PhotoIndicatorType = 'SELECTED_PHOTO' | 'OTHER_PHOTO';

type PhotoIndicatorInfo = {
    [key in PhotoIndicatorType]: {
        backgroundColor: string;
        borderColor: string;
    };
};

const PHOTO_INDICATOR_INFO: PhotoIndicatorInfo = {
    SELECTED_PHOTO: {
        backgroundColor: color.Green['750'].toString(),
        borderColor: color.Green['750'].toString(),
    },
    OTHER_PHOTO: {
        backgroundColor: color.Gray['350'].alpha(0.66).toString(),
        borderColor: color.White.toString(),
    },
};

const makeSelectedPhotoInfo = (selectedNumber: number) => {
    const type: PhotoIndicatorType = selectedNumber !== -1 ? 'SELECTED_PHOTO' : 'OTHER_PHOTO';
    return {
        styles: PHOTO_INDICATOR_INFO[type],
        text: type === 'SELECTED_PHOTO' ? selectedNumber + 1 : '',
    };
};

export default function PhotoIndicators({ uri }: PhotoIndicatorsProps) {
    const { currentSelectedPhoto, selectedPhotos } = usePhotoSelect();
    const selectedPhotoInfo = makeSelectedPhotoInfo(selectedPhotos.findIndex(({ node }) => node.image.uri === uri));

    return (
        <View style={styles.container}>
            <View style={[styles.circle, selectedPhotoInfo.styles]}>
                <Typo variant="body2" color="surface">
                    {selectedPhotoInfo.text}
                </Typo>
            </View>
            <ConditionalRenderer
                condition={selectedPhotos.length !== 0 && currentSelectedPhoto?.node.image.uri === uri}
                trueContent={<View style={styles.blur} />}
                falseContent={null}
            />
        </View>
    );
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
