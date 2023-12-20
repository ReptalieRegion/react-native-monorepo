import { color } from '@crawl/design-system';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from '@/types/global/icons';

const Logo = ({ fill = color.Teal[150].toString(), height = '32', width = '32' }: IconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
            <Path
                d="M6.34982 10.9256C4.83168 10.2374 1.46218 8.46558 1.46218 8.46558C1.46218 8.46558 0.793015 8.24248 0.435784 7.70931C0.156794 7.293 -0.226522 5.85119 0.170858 5.46676C0.568239 5.08232 1.72058 5.00563 2.51534 4.50566C3.31011 4.00569 4.2586 3.00276 6.7273 2.73717C8.51517 2.54495 11.1379 0.430873 11.6149 0.238654C12.0919 0.0464347 13.085 -0.607244 12.6877 1.6227C12.4409 3.00542 11.7261 4.00469 11.7261 4.00469C11.7261 4.00469 13.6416 2.96824 14.8334 2.50678C16.0256 2.04565 20.8336 1.31495 24.5689 3.5834C28.3039 5.85119 30.3972 9.49041 31.4301 15.5256C32.463 21.5614 32.7217 28.791 26.5822 31.4154C22.1452 33.3117 18.227 30.2637 18.4891 27.0139C18.7077 24.3036 20.8134 23.1818 22.9396 23.131C24.5291 23.0925 26.4165 24.6303 26.2377 26.5903C26.0486 28.6596 23.5755 30.0745 21.7673 28.8392C20.626 28.059 20.6607 26.3217 21.5508 25.4984C22.0172 25.0668 22.5007 25.6312 22.0783 25.9479C21.6853 26.2437 21.4427 26.7759 21.6016 27.4684C21.802 28.3412 22.999 28.8199 24.0116 28.3399C24.7604 27.9853 25.5075 26.9349 24.966 25.6488C24.0912 23.5729 20.0114 24.2654 20.0392 27.3017C20.0587 29.5861 23.4629 30.9954 25.9728 29.3139C28.3433 27.7247 29.2973 24.6492 27.9065 20.9333C27.5781 20.0542 26.794 18.0374 23.7343 17.0381C21.9581 16.4578 21.3504 16.577 20.4898 17.3966C19.3632 18.4696 17.6868 19.7109 16.3042 20.267C15.4007 20.6298 15.1914 21.1517 14.317 21.8433C13.6791 22.3485 12.2508 22.6118 12.489 20.6132C12.538 20.2022 13.609 19.2418 14.6674 18.9503C15.4007 18.7491 16.6206 17.6629 16.9398 17.4033C18.1823 16.3921 18.4236 15.4851 18.264 15.4495C16.1049 14.9658 14.7017 13.6708 14.423 13.7322C14.2648 13.7667 14.0785 15.2447 10.6877 15.8084C10.1291 15.9007 9.34149 15.8599 8.19774 16.244C6.75955 16.7264 5.6666 16.8851 5.68135 16.0003C5.68959 15.5007 5.61511 15.0903 5.89342 14.8599C6.17138 14.6295 7.37519 13.9002 8.39678 14.0399C11.5885 14.4758 11.594 12.311 11.6547 12.1563C11.6544 12.1556 9.57279 12.3867 6.34982 10.9256Z"
                fill={fill}
            />
        </Svg>
    );
};

export default Logo;
