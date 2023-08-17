import React from 'react';

import SharePostWriteRightHeader from './SharePostWriteRight';

import { createNativeStackHeader } from '@/components/common/layouts/header/utils/create-header';

export default createNativeStackHeader({ leftIcon: 'back', title: '일상공유 등록', right: <SharePostWriteRightHeader /> });
