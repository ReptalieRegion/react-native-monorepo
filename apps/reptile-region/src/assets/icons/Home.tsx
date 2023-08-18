import React from 'react';
import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg';

import { color } from '../../components/common/tokens/colors';

import { IconProps } from '<Icon>';

const Home = ({ fill = color.Gray['500'].toString(), height = '24', width = '24' }: IconProps) => {
    return (
        <Svg viewBox="0 0 24 24" width={width} height={height}>
            <G clip-path="url(#clip0_302_2)">
                <Rect width="24" height="24" fill={color.White.toString()} />
                <Path
                    d="M1.54918 12.3217L11.2652 1.79604C11.6612 1.36708 12.3388 1.36708 12.7348 1.79604L22.4508 12.3217C23.0421 12.9623 22.5878 14 21.716 14H19V22C19 22.5523 18.5523 23 18 23H14.5C13.9477 23 13.5 22.5523 13.5 22V19.5V16.5C13.5 15.9477 13.0523 15.5 12.5 15.5H12H11.5C10.9477 15.5 10.5 15.9477 10.5 16.5V22C10.5 22.5523 10.0523 23 9.5 23H6C5.44772 23 5 22.5523 5 22V14H2.28399C1.41223 14 0.957885 12.9623 1.54918 12.3217Z"
                    fill={fill}
                    stroke={color.Black.toString()}
                />
            </G>
            <Defs>
                <ClipPath id="clip0_302_2">
                    <Rect width={width} height={height} fill={color.White.toString()} />
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export default Home;
