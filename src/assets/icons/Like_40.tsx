import { IconProps } from '<Icon>';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

const Like_40 = ({ stroke, fill }: IconProps) => {
    return (
        <Svg width="40" height="40" viewBox="0 0 24 24" fill={fill}>
            <Path
                d="M10.287 6.48068C11.3341 7.01716 12 8 12 8C12 8 12.6659 7.01716 13.713 6.48068C14.8746 5.8855 16.0406 5.79562 17.139 6.48068C18.0599 7.05512 18.6086 7.80258 18.8519 8.78453C19.0696 9.66282 19.028 10.2026 18.8519 11.0884C18.2499 14.1174 12 18 12 18C12 18 5.75014 14.1174 5.14807 11.0884C4.97201 10.2026 4.93038 9.66282 5.14805 8.78453C5.39143 7.80258 5.94002 7.05512 6.86099 6.48068C7.9593 5.79562 9.12533 5.8855 10.287 6.48068Z"
                fill={fill}
                stroke={stroke}
                stroke-width="1.3"
            />
        </Svg>
    );
};

export default Like_40;
