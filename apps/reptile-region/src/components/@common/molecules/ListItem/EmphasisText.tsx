import { Typo } from '@crawl/design-system';
import React from 'react';

type EmphasisTextState = {
    text: string;
};

type EmphasisTextProps = EmphasisTextState;

export default function EmphasisText({ text }: EmphasisTextProps) {
    return (
        <Typo variant={'body2'} color="primary">
            {text}
        </Typo>
    );
}
