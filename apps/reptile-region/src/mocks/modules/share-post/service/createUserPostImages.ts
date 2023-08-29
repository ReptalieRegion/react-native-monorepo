import { fakerKO } from '@faker-js/faker';

import type { SharePostImagesData } from '<SharePostAPI>';

const createUserPostImages = (): SharePostImagesData => {
    return {
        post: {
            id: fakerKO.string.uuid(),
            thumbnail: {
                src: fakerKO.image.avatar(),
            },
        },
    };
};

export default createUserPostImages;
