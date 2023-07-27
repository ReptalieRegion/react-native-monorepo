import { UIPromptsDefaultProps } from '<UIPrompts>';
import ToastContainer from '@/components/common/ui-prompts/toast/amtos/ToastContainer';
import { MAX_SELECT_PHOTO_COUNT } from '@/stores/share-post/write';
import React from 'react';

const PhotoLimit = ({ uiPromptsClose }: UIPromptsDefaultProps) => {
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
