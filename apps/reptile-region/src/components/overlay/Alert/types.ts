import type { TextColorType, VariantType } from '@crawl/design-system';

type AlertStyleType = 'cancel' | 'default' | 'danger';

type AlertStyle = {
    [key in AlertStyleType]: {
        color: TextColorType;
        variant: VariantType;
    };
};

export type { AlertStyle, AlertStyleType };
