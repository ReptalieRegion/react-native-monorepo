import React from 'react';
import { Modal } from 'react-native';

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
        <Modal transparent={true}>
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

export default OverlayHost;
