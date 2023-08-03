import React from 'react';

import PhotoRegister from '../molecules/PhotoRegister';
import PostContentWrite from '../molecules/PostContentWrite';

import { ScrollContextComponent } from '@/contexts/scroll/ScrollContext';

const SharePostWrite = () => {
    return (
        <ScrollContextComponent>
            <PhotoRegister />
            <PostContentWrite />
        </ScrollContextComponent>
    );
};

export default SharePostWrite;
