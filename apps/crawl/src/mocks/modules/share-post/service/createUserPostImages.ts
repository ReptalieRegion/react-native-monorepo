import { fakerKO } from '@faker-js/faker';

const createUserPostImages = () => {
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
