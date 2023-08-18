import React from 'react';
import { Path, Svg } from 'react-native-svg';

import { IconProps } from '<Icon>';
import { color } from '@/components/common/tokens/colors';

const Like_55 = ({
    width = 24,
    height = 24,
    fill = color.Red[500].toString(),
    stroke = color.Red[500].toString(),
}: IconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 55 55" fill={fill}>
            <Path
                d="M21.5044 5.68237C25.1693 7.56007 27.4999 11 27.4999 11C27.4999 11 29.8305 7.56007 33.4954 5.68237C37.5612 3.59926 41.6423 3.28467 45.4864 5.68237C48.7097 7.69291 50.63 10.309 51.4818 13.7459C52.2437 16.8199 52.098 18.7092 51.4818 21.8094C49.3745 32.411 27.4999 46 27.4999 46C27.4999 46 5.62549 32.411 3.51824 21.8094C2.90204 18.7092 2.75632 16.8199 3.51819 13.7459C4.36999 10.309 6.29008 7.69291 9.51346 5.68237C13.3576 3.28467 17.4386 3.59926 21.5044 5.68237Z"
                fill={fill}
            />
            <Path
                d="M27.4999 11L26.879 11.4207L27.4999 12.3371L28.1208 11.4207L27.4999 11ZM21.5044 5.68237L21.1624 6.34986L21.1624 6.34986L21.5044 5.68237ZM9.51346 5.68237L9.11654 5.04601L9.11654 5.04601L9.51346 5.68237ZM3.51819 13.7459L2.79022 13.5654L2.79022 13.5654L3.51819 13.7459ZM3.51824 21.8094L2.78263 21.9556L2.78263 21.9556L3.51824 21.8094ZM27.4999 46L27.1041 46.6371L27.4999 46.8829L27.8957 46.6371L27.4999 46ZM51.4818 21.8094L52.2174 21.9556L52.2174 21.9556L51.4818 21.8094ZM51.4818 13.7459L52.2098 13.5654L52.2098 13.5654L51.4818 13.7459ZM45.4864 5.68237L45.0894 6.31873L45.0894 6.31873L45.4864 5.68237ZM33.4954 5.68237L33.1534 5.01488L33.1534 5.01488L33.4954 5.68237ZM27.4999 11C28.1208 10.5793 28.1207 10.5792 28.1206 10.579C28.1205 10.5789 28.1204 10.5787 28.1203 10.5786C28.1201 10.5783 28.1199 10.5779 28.1196 10.5775C28.1191 10.5767 28.1184 10.5757 28.1175 10.5745C28.1159 10.572 28.1136 10.5688 28.1108 10.5647C28.1052 10.5565 28.0973 10.5452 28.0872 10.5307C28.0669 10.5018 28.0377 10.4605 27.9997 10.4082C27.9238 10.3035 27.8128 10.1543 27.6688 9.97051C27.3809 9.60321 26.9595 9.09597 26.42 8.52855C25.3457 7.39855 23.7804 6.00575 21.8464 5.01488L21.1624 6.34986C22.8933 7.23669 24.3257 8.50271 25.3329 9.56209C25.8342 10.0894 26.2246 10.5595 26.4882 10.8958C26.6199 11.0639 26.7196 11.1981 26.7855 11.2889C26.8184 11.3343 26.8428 11.3687 26.8585 11.3911C26.8663 11.4023 26.872 11.4105 26.8754 11.4155C26.8771 11.4179 26.8783 11.4196 26.8789 11.4205C26.8792 11.421 26.8793 11.4212 26.8794 11.4212C26.8794 11.4212 26.8793 11.4212 26.8793 11.4211C26.8793 11.4211 26.8792 11.421 26.8792 11.4209C26.8791 11.4208 26.879 11.4207 27.4999 11ZM21.8464 5.01488C17.6125 2.8456 13.2412 2.47332 9.11654 5.04601L9.91038 6.31873C13.4739 4.09602 17.2648 4.35291 21.1624 6.34986L21.8464 5.01488ZM9.11654 5.04601C5.73682 7.15406 3.69143 9.92924 2.79022 13.5654L4.24617 13.9263C5.04856 10.6888 6.84334 8.23175 9.91038 6.31873L9.11654 5.04601ZM2.79022 13.5654C1.99325 16.781 2.15318 18.7888 2.78263 21.9556L4.25385 21.6631C3.6509 18.6297 3.51938 16.8587 4.24617 13.9263L2.79022 13.5654ZM2.78263 21.9556C3.34698 24.7948 5.20885 27.7508 7.58261 30.5471C9.9694 33.3587 12.9382 36.0829 15.8224 38.4591C18.7094 40.8376 21.5275 42.8805 23.6228 44.3281C24.6709 45.0523 25.5393 45.6283 26.1465 46.0238C26.4502 46.2216 26.6886 46.3743 26.8515 46.4778C26.933 46.5296 26.9957 46.5691 27.0382 46.5958C27.0595 46.6092 27.0757 46.6193 27.0867 46.6262C27.0923 46.6297 27.0965 46.6323 27.0994 46.6341C27.1008 46.635 27.102 46.6357 27.1028 46.6362C27.1032 46.6365 27.1035 46.6367 27.1037 46.6368C27.104 46.637 27.1041 46.6371 27.4999 46C27.8957 45.3629 27.8957 45.3629 27.8956 45.3629C27.8955 45.3628 27.8953 45.3627 27.8951 45.3625C27.8945 45.3622 27.8937 45.3617 27.8925 45.3609C27.8901 45.3594 27.8864 45.3571 27.8814 45.354C27.8714 45.3478 27.8562 45.3383 27.836 45.3256C27.7956 45.3002 27.7352 45.2621 27.6559 45.2118C27.4975 45.1111 27.2638 44.9615 26.9652 44.7669C26.3679 44.3779 25.511 43.8095 24.4754 43.094C22.4034 41.6624 19.6212 39.6454 16.7762 37.3014C13.9284 34.9552 11.0335 32.2943 8.72614 29.5763C6.40578 26.843 4.74313 24.1247 4.25385 21.6631L2.78263 21.9556ZM27.4999 46C27.8957 46.6371 27.8959 46.637 27.8961 46.6368C27.8963 46.6367 27.8967 46.6365 27.8971 46.6362C27.8979 46.6357 27.899 46.635 27.9004 46.6341C27.9033 46.6323 27.9076 46.6297 27.9131 46.6262C27.9241 46.6193 27.9404 46.6092 27.9616 46.5958C28.0041 46.5691 28.0668 46.5296 28.1483 46.4778C28.3113 46.3743 28.5497 46.2216 28.8533 46.0238C29.4605 45.6283 30.3289 45.0523 31.3771 44.3281C33.4724 42.8805 36.2905 40.8376 39.1775 38.4591C42.0618 36.0829 45.0306 33.3587 47.4174 30.5471C49.7912 27.7508 51.653 24.7948 52.2174 21.9556L50.7462 21.6631C50.2569 24.1247 48.5942 26.843 46.2739 29.5763C43.9665 32.2943 41.0716 34.9552 38.2237 37.3014C35.3787 39.6454 32.5965 41.6624 30.5244 43.094C29.4889 43.8095 28.6319 44.3779 28.0346 44.7669C27.736 44.9615 27.5024 45.1111 27.3439 45.2118C27.2647 45.2621 27.2042 45.3002 27.1638 45.3256C27.1436 45.3383 27.1285 45.3477 27.1185 45.354C27.1135 45.3571 27.1098 45.3594 27.1074 45.3609C27.1062 45.3617 27.1053 45.3622 27.1048 45.3625C27.1045 45.3627 27.1043 45.3628 27.1042 45.3629C27.1041 45.3629 27.1041 45.3629 27.4999 46ZM52.2174 21.9556C52.8469 18.7888 53.0067 16.781 52.2098 13.5654L50.7538 13.9263C51.4806 16.8587 51.3491 18.6297 50.7462 21.6632L52.2174 21.9556ZM52.2098 13.5654C51.3085 9.92922 49.263 7.15405 45.8833 5.04601L45.0894 6.31873C48.1565 8.23176 49.9514 10.6888 50.7538 13.9263L52.2098 13.5654ZM45.8833 5.04601C41.7586 2.47332 37.3873 2.8456 33.1534 5.01488L33.8374 6.34986C37.735 4.35291 41.5259 4.09602 45.0894 6.31873L45.8833 5.04601ZM33.1534 5.01488C31.2195 6.00575 29.6541 7.39855 28.5798 8.52855C28.0403 9.09597 27.6189 9.60321 27.331 9.97051C27.187 10.1543 27.076 10.3035 27.0001 10.4082C26.9621 10.4605 26.9329 10.5018 26.9126 10.5307C26.9025 10.5452 26.8946 10.5565 26.889 10.5647C26.8862 10.5688 26.884 10.572 26.8823 10.5745C26.8815 10.5757 26.8808 10.5767 26.8802 10.5775C26.8799 10.5779 26.8797 10.5783 26.8795 10.5786C26.8794 10.5787 26.8793 10.5789 26.8792 10.579C26.8791 10.5792 26.879 10.5793 27.4999 11C28.1208 11.4207 28.1207 11.4208 28.1206 11.4209C28.1206 11.421 28.1206 11.4211 28.1205 11.4211C28.1205 11.4212 28.1204 11.4212 28.1205 11.4212C28.1205 11.4212 28.1206 11.4209 28.1209 11.4205C28.1215 11.4196 28.1227 11.4179 28.1244 11.4155C28.1278 11.4105 28.1335 11.4023 28.1413 11.3911C28.157 11.3687 28.1814 11.3343 28.2143 11.2889C28.2802 11.1981 28.3799 11.0639 28.5116 10.8958C28.7753 10.5595 29.1656 10.0894 29.6669 9.56209C30.6741 8.50271 32.1065 7.23669 33.8374 6.34986L33.1534 5.01488Z"
                fill={fill}
                stroke={stroke}
            />
        </Svg>
    );
};

export default Like_55;
