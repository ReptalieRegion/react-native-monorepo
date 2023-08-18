import React from 'react';

import ImageCropRightHeader from './ImageCropRight';

import { createNativeStackHeader } from '@/components/common/layouts/header/utils/create-header';

export default createNativeStackHeader({ leftIcon: 'cancel', title: '사진 등록', right: <ImageCropRightHeader /> });
