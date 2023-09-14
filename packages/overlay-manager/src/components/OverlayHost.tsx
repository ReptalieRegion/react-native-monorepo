import React from 'react';
import { Modal, StyleSheet } from 'react-native';

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
        <Modal style={styles.container}>
            {overlayState.openList.map(({ name, params }) => {
                const Component = overlayState.component?.[name];

                if (Component === undefined) {
                    return null;
                }

                return <Component key={name} {...params} />;
            })}
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 9999,
    },
});

export default OverlayHost;
