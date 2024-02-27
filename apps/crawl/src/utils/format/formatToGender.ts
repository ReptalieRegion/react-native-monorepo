import type { EntityGender } from '@/types/apis/common';

export function formatToGender(gender: EntityGender) {
    switch (gender) {
        case 'Male':
            return '수컷';
        case 'Female':
            return '암컷';
        case 'Uncategorized':
            return '미구분';
    }
}
