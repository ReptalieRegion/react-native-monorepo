import { color } from '@reptile-region/design-system';
import React from 'react';

import type { EntityGender } from '../../organisms/CreateEntity/type';

import Female from '@/assets/icons/Female';
import Male from '@/assets/icons/Male';
import Question from '@/assets/icons/Question';

export default function GenderIcon({ gender }: { gender: EntityGender }) {
    switch (gender) {
        case 'Male':
            return <Male fill={color.Blue[500].toString()} />;
        case 'Female':
            return <Female fill={color.Pink[500].toString()} />;
        case 'Uncategorized':
            return <Question fill={color.Gray[500].toString()} />;
        default:
            return <></>;
    }
}
