import React from 'react';

import { createNativeStackHeader } from '../../../../common/layouts/header/utils/create-header';

import ImageCropRightHeader from './ImageCropRight';

export default createNativeStackHeader({ leftIcon: 'cancel', title: '사진 등록', right: <ImageCropRightHeader /> });
