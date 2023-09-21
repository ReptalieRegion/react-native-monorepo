import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { KebabMenu } from '@/assets/icons';

type PostKebabProps = {
    onPress: () => void;
};

export default function PostKebabButton({ onPress }: PostKebabProps) {
    return (
        <TouchableOpacity onPress={onPress}>
            <KebabMenu />
        </TouchableOpacity>
    );
}
