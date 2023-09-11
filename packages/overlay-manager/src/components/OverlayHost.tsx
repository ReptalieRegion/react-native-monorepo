import React from 'react';
import { StyleSheet, View } from 'react-native';

import useOverlayState from '../hooks/useOverlayState';

const OverlayHost = () => {
    const overlayState = useOverlayState();

    if (overlayState === null) {
        return null;
    }

    if (overlayState.openList.length === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            {overlayState.openList.map(({ name, params }) => {
                const Component = overlayState.component?.[name];

                if (Component === undefined) {
                    return null;
                }

                return <Component key={name} {...params} />;
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default OverlayHost;
