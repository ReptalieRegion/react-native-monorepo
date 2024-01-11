import { Typo } from '@crawl/design-system';
import type { RenderFallbackProps } from '@crawl/error-boundary';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type EntityListErrorProps = RenderFallbackProps & {
    onPress: () => void;
};

function EntityListError({ onPress }: EntityListErrorProps) {
    return (
        <TouchableOpacity style={styles.wrapper} onPress={onPress}>
            <Typo color="placeholder">로그인을 하고 개체를 관리해 보세요</Typo>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    },
});

export default EntityListError;
