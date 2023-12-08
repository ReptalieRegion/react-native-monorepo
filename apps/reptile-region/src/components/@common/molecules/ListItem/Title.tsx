import { Typo } from '@reptile-region/design-system';
import React from 'react';

type TitleState = {
    text: string;
    disabled?: boolean | undefined;
};

type TitleProps = TitleState;

export default function Title({ text, disabled }: TitleProps) {
    return (
        <Typo variant="body1" textAlign="left" color={disabled ? 'placeholder' : 'default'}>
            {text}
        </Typo>
    );
}
