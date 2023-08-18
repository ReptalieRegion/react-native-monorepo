import React from 'react';

import { MAX_SELECT_PHOTO_COUNT } from '../../../../../stores/share-post/write';
import { color } from '../../../../common/tokens/colors';
import ToastContainer from '../../../../common/ui-prompts/toast/atoms/ToastContainer';

import { UIPromptsDefaultProps } from '<UIPrompts>';

const PhotoLimit = ({ uiPromptsClose }: UIPromptsDefaultProps) => {
    return (
        <ToastContainer
            uiPromptsClose={uiPromptsClose}
            text={`이미지는 최대 ${MAX_SELECT_PHOTO_COUNT}개 입니다.`}
            containerStyle={{ backgroundColor: color.LightBlue['150'].toString() }}
            textStyle={{ color: color.LightBlue['950'].toString() }}
        />
    );
};

export default PhotoLimit;
