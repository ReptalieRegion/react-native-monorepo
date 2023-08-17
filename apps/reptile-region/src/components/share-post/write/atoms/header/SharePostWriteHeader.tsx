import React from 'react';

import { createNativeStackHeader } from '../../../../common/layouts/header/utils/create-header';

import SharePostWriteRightHeader from './SharePostWriteRight';

export default createNativeStackHeader({ leftIcon: 'back', title: '일상공유 등록', right: <SharePostWriteRightHeader /> });
