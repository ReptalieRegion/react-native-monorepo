import TouchableTypo from 'design-system/lib/components/Text/TouchableTypo';
import React from 'react';

type CommentActionButtonProps = {
    onPress?: () => void;
    text: string;
};

const CommentActionButton = ({ text, onPress }: CommentActionButtonProps) => {
    return (
        <TouchableTypo variant="body4" color="placeholder" onPress={onPress}>
            {text}
        </TouchableTypo>
    );
};

export default CommentActionButton;
