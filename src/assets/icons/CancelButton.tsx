import React from 'react';
import { IIconProps } from '<Icon>';
import { Path, Svg } from 'react-native-svg';

const CancelButton = ({ width = 15, height = 15, fill = 'black' }: IIconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 15 15" fill="none">
            <Path
                d="M8.38121 7.50012L11.0687 4.81887C11.1864 4.70118 11.2525 4.54155 11.2525 4.37512C11.2525 4.20868 11.1864 4.04906 11.0687 3.93137C10.951 3.81368 10.7914 3.74756 10.625 3.74756C10.4585 3.74756 10.2989 3.81368 10.1812 3.93137L7.49996 6.61887L4.81871 3.93137C4.70102 3.81368 4.5414 3.74756 4.37496 3.74756C4.20852 3.74756 4.0489 3.81368 3.93121 3.93137C3.81352 4.04906 3.7474 4.20868 3.7474 4.37512C3.7474 4.54155 3.81352 4.70118 3.93121 4.81887L6.61871 7.50012L3.93121 10.1814C3.87263 10.2395 3.82614 10.3086 3.7944 10.3848C3.76267 10.4609 3.74634 10.5426 3.74634 10.6251C3.74634 10.7076 3.76267 10.7893 3.7944 10.8655C3.82614 10.9416 3.87263 11.0108 3.93121 11.0689C3.98931 11.1274 4.05844 11.1739 4.1346 11.2057C4.21076 11.2374 4.29245 11.2537 4.37496 11.2537C4.45747 11.2537 4.53916 11.2374 4.61532 11.2057C4.69148 11.1739 4.76061 11.1274 4.81871 11.0689L7.49996 8.38137L10.1812 11.0689C10.2393 11.1274 10.3084 11.1739 10.3846 11.2057C10.4608 11.2374 10.5425 11.2537 10.625 11.2537C10.7075 11.2537 10.7892 11.2374 10.8653 11.2057C10.9415 11.1739 11.0106 11.1274 11.0687 11.0689C11.1273 11.0108 11.1738 10.9416 11.2055 10.8655C11.2372 10.7893 11.2536 10.7076 11.2536 10.6251C11.2536 10.5426 11.2372 10.4609 11.2055 10.3848C11.1738 10.3086 11.1273 10.2395 11.0687 10.1814L8.38121 7.50012Z"
                fill={fill}
            />
        </Svg>
    );
};

export default CancelButton;
