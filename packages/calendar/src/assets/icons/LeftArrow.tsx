import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function LeftArrow({ fill }: { fill: string }) {
    return (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path d="M16 6L8 12.5L16 19V6Z" fill={fill} />
        </Svg>
    );
}
