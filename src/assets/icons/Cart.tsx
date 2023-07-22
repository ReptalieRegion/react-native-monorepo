import React from 'react';
import { IIconProps } from '<Icon>';
import { Path, Svg } from 'react-native-svg';

const Cart = ({ fill = '#868E96FF', height = '24', width = '24' }: IIconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24">
            <Path
                d="M11.5 21.75C11.5 22.7165 10.7165 23.5 9.75 23.5C8.7835 23.5 8 22.7165 8 21.75C8 20.7835 8.7835 20 9.75 20C10.7165 20 11.5 20.7835 11.5 21.75Z"
                fill={fill}
                stroke="black"
            />
            <Path
                d="M20 21.75C20 22.7165 19.2165 23.5 18.25 23.5C17.2835 23.5 16.5 22.7165 16.5 21.75C16.5 20.7835 17.2835 20 18.25 20C19.2165 20 20 20.7835 20 21.75Z"
                fill={fill}
                stroke="black"
            />
            <Path
                d="M20 16H7.5L5 6H23L20 16Z"
                fill={fill}
                stroke="black"
                stroke-miterlimit="3.99933"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <Path
                d="M7.5 16L8 18.5H20"
                stroke="black"
                stroke-miterlimit="3.99933"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="#ffffff"
            />
            <Path d="M7.5 9H20.5" stroke="black" stroke-miterlimit="3.99933" stroke-linecap="round" />
            <Path d="M9.5 11H18.5" stroke="black" stroke-miterlimit="3.99933" stroke-linecap="round" />
            <Path d="M11.5 13H16.5" stroke="black" stroke-miterlimit="3.99933" stroke-linecap="round" />
            <Path
                d="M5 6L3.5 3H1"
                stroke="black"
                stroke-miterlimit="3.99933"
                stroke-linecap="round"
                fill="#ffffff"
                stroke-linejoin="round"
            />
        </Svg>
    );
};

export default Cart;
