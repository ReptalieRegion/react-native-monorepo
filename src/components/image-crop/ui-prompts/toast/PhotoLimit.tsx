import { TUIPromptsDefaultProps } from '<UIPrompts>';
import ToastContainer from '@/components/ui-prompts/toast/amtos/ToastContainer';
import { MAX_SELECT_PHOTO_COUNT } from '@/const/image';
import React from 'react';

const PhotoLimit = ({ uiPromptsClose }: TUIPromptsDefaultProps) => {
    return (
        <ToastContainer
            uiPromptsClose={uiPromptsClose}
            text={`이미지는 최대 ${MAX_SELECT_PHOTO_COUNT}개 입니다.`}
            containerStyle={containerStyle}
            textStyle={textStyle}
        />
    );
};

const containerStyle = {
    backgroundColor: '#B8E7FB',
};

const textStyle = {
    color: '#07435F',
};

export default PhotoLimit;
