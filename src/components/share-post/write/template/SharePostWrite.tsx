import React from 'react';
import PhotoRegister from '../molecules/PhotoRegister';
import PostContentWrite from '../molecules/PostContentWrite';
import { ScrollContextComponent } from '@/contexts/scroll/ScrollContext';
import ShareHeader from '@/components/share-post/write/atoms/header/SharePostWriteHeader';

const SharePostWrite = () => {
    return (
        <>
            <ShareHeader />
            <ScrollContextComponent>
                <PhotoRegister />
                <PostContentWrite />
            </ScrollContextComponent>
        </>
    );
};

export default SharePostWrite;
