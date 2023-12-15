import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function RightArrow({ fill }: { fill: string }) {
    return (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill={fill}>
            <Path d="M8 19L16 12.5L8 6L8 19Z" fill={fill} />
        </Svg>
    );
}
