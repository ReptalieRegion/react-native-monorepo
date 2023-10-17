import { color } from '@reptile-region/design-system';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from '<Icon>';

const Community = ({ fill = color.Gray['500'].toString(), height = '24', width = '24' }: IconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
            <Path
                d="M3.52218 15.5386C1.33962 12.8247 1.65158 9.07711 3.52218 6.49271C7.61329 0.840492 17.0727 0.66617 20.9822 6.49271C23 9.5 22.5568 12.3925 20.9822 15.5386C19.5 18.4999 15.5 21.9999 15.5 21.9999L16 16.4999C16 16.4999 6.63991 19.4152 3.52218 15.5386Z"
                fill={fill}
            />
            <Path
                d="M3.52218 6.49271L3.92722 6.78588L3.52218 6.49271ZM3.52218 15.5386L3.91181 15.2252L3.52218 15.5386ZM16 16.4999L16.4979 16.5452C16.5131 16.3789 16.4442 16.216 16.3143 16.111C16.1844 16.0061 16.0107 15.9729 15.8513 16.0225L16 16.4999ZM15.5 21.9999L15.0021 21.9546C14.9835 22.1582 15.0908 22.3526 15.273 22.4454C15.4551 22.5382 15.6754 22.5108 15.8293 22.3762L15.5 21.9999ZM20.9822 15.5386L21.4293 15.7624L20.9822 15.5386ZM20.9822 6.49271L20.567 6.7713L20.9822 6.49271ZM3.11715 6.19954C1.13968 8.93158 0.783465 12.931 3.13256 15.8519L3.91181 15.2252C1.89577 12.7184 2.16348 9.22264 3.92722 6.78588L3.11715 6.19954ZM3.13256 15.8519C4.0109 16.9441 5.30527 17.5287 6.68598 17.8139C8.06806 18.0994 9.58411 18.0954 10.9748 17.971C12.3691 17.8462 13.6601 17.5982 14.6007 17.3821C15.0717 17.274 15.4565 17.1734 15.7244 17.0996C15.8585 17.0627 15.9634 17.0325 16.0353 17.0113C16.0713 17.0007 16.0991 16.9924 16.1181 16.9866C16.1276 16.9837 16.135 16.9815 16.1401 16.9799C16.1427 16.9791 16.1447 16.9785 16.1461 16.9781C16.1468 16.9779 16.1474 16.9777 16.1478 16.9775C16.148 16.9775 16.1482 16.9774 16.1484 16.9774C16.1485 16.9773 16.1487 16.9773 16 16.4999C15.8513 16.0225 15.8514 16.0225 15.8514 16.0225C15.8514 16.0225 15.8514 16.0225 15.8513 16.0225C15.8512 16.0225 15.8509 16.0226 15.8505 16.0228C15.8497 16.023 15.8483 16.0235 15.8463 16.0241C15.8424 16.0253 15.8363 16.0271 15.828 16.0296C15.8114 16.0347 15.7863 16.0422 15.7529 16.052C15.6862 16.0717 15.587 16.1003 15.459 16.1355C15.2029 16.206 14.8321 16.303 14.3768 16.4075C13.465 16.617 12.2211 16.8555 10.8857 16.9749C9.54663 17.0948 8.13808 17.0927 6.88828 16.8346C5.63712 16.5761 4.59233 16.0714 3.91181 15.2252L3.13256 15.8519ZM15.5021 16.4546L15.0021 21.9546L15.9979 22.0452L16.4979 16.5452L15.5021 16.4546ZM15.5 21.9999C15.8293 22.3762 15.8293 22.3761 15.8294 22.3761C15.8294 22.376 15.8295 22.3759 15.8296 22.3759C15.8298 22.3757 15.83 22.3755 15.8303 22.3752C15.8309 22.3747 15.8318 22.374 15.8329 22.373C15.835 22.3711 15.8381 22.3684 15.8422 22.3648C15.8503 22.3577 15.8621 22.3472 15.8774 22.3336C15.9081 22.3063 15.9528 22.2664 16.0101 22.2146C16.1245 22.1112 16.289 21.9607 16.4907 21.771C16.8939 21.3919 17.447 20.8552 18.0474 20.2245C19.2383 18.9734 20.653 17.3133 21.4293 15.7624L20.535 15.3148C19.8291 16.7252 18.5027 18.2957 17.3231 19.535C16.7383 20.1494 16.1988 20.6728 15.8056 21.0425C15.6092 21.2272 15.4496 21.3733 15.3395 21.4728C15.2844 21.5226 15.2418 21.5607 15.2131 21.5861C15.1988 21.5989 15.188 21.6084 15.1809 21.6147C15.1773 21.6179 15.1746 21.6202 15.173 21.6217C15.1721 21.6224 15.1715 21.6229 15.1711 21.6233C15.1709 21.6234 15.1708 21.6235 15.1708 21.6236C15.1707 21.6236 15.1707 21.6236 15.1707 21.6236C15.1707 21.6236 15.1707 21.6236 15.5 21.9999ZM21.4293 15.7624C22.2335 14.1556 22.7699 12.5732 22.829 10.9821C22.8885 9.37892 22.462 7.80077 21.3974 6.21412L20.567 6.7713C21.5202 8.19194 21.881 9.56369 21.8297 10.945C21.7779 12.3386 21.3055 13.7755 20.535 15.3148L21.4293 15.7624ZM21.3974 6.21412C19.332 3.13607 15.8166 1.66552 12.317 1.68819C8.81894 1.71084 5.27035 3.22471 3.11715 6.19954L3.92722 6.78588C5.86513 4.10849 9.09177 2.70909 12.3235 2.68816C15.5538 2.66725 18.7228 4.02281 20.567 6.7713L21.3974 6.21412Z"
                fill={color.Black.toString()}
            />
            <Path d="M6.5 7H18.5" stroke={color.Black.toString()} stroke-miterlimit="3.99933" stroke-linecap="round" />
            <Path d="M6.5 10H16.5" stroke={color.Black.toString()} stroke-miterlimit="3.99933" stroke-linecap="round" />
            <Path d="M6.5 13H14.5" stroke={color.Black.toString()} stroke-miterlimit="3.99933" stroke-linecap="round" />
        </Svg>
    );
};

export default Community;
