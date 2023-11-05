import { Typo } from '@reptile-region/design-system';
import React from 'react';

type TitleState = {
    text: string;
};

type TitleProps = TitleState;

export default function Title({ text }: TitleProps) {
    return (
        <Typo variant={'title4'} textAlign="left">
            {text}
        </Typo>
    );
}
