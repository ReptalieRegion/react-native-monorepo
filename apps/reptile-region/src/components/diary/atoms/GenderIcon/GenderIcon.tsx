import { color } from '@crawl/design-system';
import React from 'react';

import type { EntityGender } from '../../../../pages/diary/entity-manager/create/@common/context/CreateEntity/type';

import Female from '@/assets/icons/Female';
import Male from '@/assets/icons/Male';
import Question from '@/assets/icons/Question';

type GenderIconProps = {
    gender: EntityGender;
    size?: number;
};

export default function GenderIcon({ gender, size = 24 }: GenderIconProps) {
    switch (gender) {
        case 'Male':
            return <Male fill={color.Blue[500].toString()} width={size} height={size} />;
        case 'Female':
            return <Female fill={color.Pink[500].toString()} width={size} height={size} />;
        case 'Uncategorized':
        default:
            return <Question fill={color.Red[500].toString()} width={size} height={size} />;
    }
}
