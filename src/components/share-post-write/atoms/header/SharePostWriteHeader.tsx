import React from 'react';
import Header from '../../../ui/header/Header';
import SharePostWriteRightHeader from './SharePostWriteRight';

const ShareHeader = () => {
    return <Header title="일상공유 등록" right={<SharePostWriteRightHeader />} />;
};

export default ShareHeader;
