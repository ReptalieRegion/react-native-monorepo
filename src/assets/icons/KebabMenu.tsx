import React from 'react';
import { Circle, Rect, Svg } from 'react-native-svg';

const KebabMenu = () => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Rect width="24" height="24" fill="white" />
            <Circle cx="22.8" cy="6" r="1.2" fill="#222222" />
            <Circle cx="22.8" cy="12" r="1.2" fill="#222222" />
            <Circle cx="22.8" cy="18" r="1.2" fill="#222222" />
        </Svg>
    );
};

export default KebabMenu;
