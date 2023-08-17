import React from 'react';

import { ScrollContextComponent } from '../../../../contexts/scroll/Scroll';
import PhotoRegister from '../molecules/PhotoRegister';
import PostContentWrite from '../molecules/PostContentWrite';

const SharePostWrite = () => {
    return (
        <ScrollContextComponent>
            <PhotoRegister />
            <PostContentWrite />
        </ScrollContextComponent>
    );
};

export default SharePostWrite;
