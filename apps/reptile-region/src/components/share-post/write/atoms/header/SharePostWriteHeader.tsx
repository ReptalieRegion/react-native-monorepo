import React from 'react';

import SharePostWriteRightHeader from './SharePostWriteRight';

import { createNativeStackHeader } from '@/components/@common/molecules';

export default createNativeStackHeader({ leftIcon: 'back', title: '일상공유 등록', right: <SharePostWriteRightHeader /> });
