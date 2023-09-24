import { fakerKO } from '@faker-js/faker';

import createEmptyArray from '@/utils/array/createEmptyArray';

interface TimeStamp {
    createdAt: Date;
    updatedAt: Date;
}

interface User extends TimeStamp {
    _id: string;
    userId: string;
    password: string;
    name: string;
    nickname: string;
    phone: string;
}

const createUser = (): User => {
    return {
        _id: fakerKO.string.uuid(),
        userId: fakerKO.internet.email(),
        password: '123',
        phone: fakerKO.phone.number(),
        name: fakerKO.person.fullName(),
        nickname: fakerKO.person.middleName(),
        createdAt: fakerKO.date.between({ from: '2023-01-01T00:00:00.000Z', to: '2023-05-30T00:00:00.000Z' }),
        updatedAt: fakerKO.date.between({ from: '2023-05-30T00:00:00.000Z', to: '2023-09-23T00:00:00.000Z' }),
    };
};

export const createJson = () => {
    const users = createEmptyArray(50).reduce<User[]>((prev) => {
        const user = createUser();
        const newUser = prev.filter((prevUser) => prevUser?.nickname !== user.nickname || prevUser?.userId !== user.userId);
        newUser.push(user);
        return newUser;
    }, []);
    console.log(users);
};
