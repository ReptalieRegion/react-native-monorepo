import { faker, fakerKO } from '@faker-js/faker';
import type { InfiniteData } from '@tanstack/react-query';
import { range } from 'lodash-es';

import type { EntityGender } from '@/components/diary/organisms/CreateEntity/type';
import { 모프로컬리스트, 분류리스트, 상세종리스트, 종리스트 } from '@/json/entity';
import type { FetchEntityListResponse } from '@/types/apis/diary/entity';
import type { InfiniteState } from '@/types/apis/utils';

export type Variety = {
    분류: string;
    종: string;
    상세종: string;
    모프로컬: string;
};

export type DiaryEntity = {
    id: string;
    image: string;
    name: string;
    gender: EntityGender;
    variety: Variety;
    weight: number;
    hatching: Date;
};

const image = [
    'https://thesafari.kr/web/upload/NNEditor/20230622/KakaoTalk_20230621_152818109_03.jpg',
    'https://thesafari.kr/web/product/big/202304/e9273c6e13b6169acf4ceb57e5788a1b.jpg',
    'https://cdn-pro-web-216-165.cdn-nhncommerce.com/cocktailteam_godomall_com/data/goods/19/12/52/1000002658/1000002658_detail_03.jpg',
    'https://thesafari.kr/web/upload/manin_03.jpg',
    'https://thesafari.kr/web/upload/NNEditor/20221215/KakaoTalk_20221215_142022251.jpg',
    'https://thesafari.kr/web/upload/manin_05.jpg',
    'https://thesafari.kr/web/upload/NNEditor/20221215/KakaoTalk_20221215_142038582_14.jpg',
    'https://thesafari.kr/web/product/big/202307/9b2db47811b80e65831b25b838fc438f.png',
    'https://thesafari.kr/web/product/big/202307/aa7a55d38ce8e503b67038cd535a8abc.png',
    'https://thesafari.kr/web/product/big/202306/e55d090cda23141a8ed63a5b4c4f42bf.jpg',
    'https://commons.wikimedia.org/wiki/File:Crested_gecko-mars.jpg',
    'https://thesafari.kr/web/upload/NNEditor/20230622/KakaoTalk_20230621_152818109_03.jpg',
    'https://thesafari.kr/web/product/big/202304/e9273c6e13b6169acf4ceb57e5788a1b.jpg',
    'https://thesafari.kr/web/upload/manin_03.jpg',
    'https://thesafari.kr/web/upload/NNEditor/20221215/KakaoTalk_20221215_142022251.jpg',
    'https://thesafari.kr/web/upload/manin_05.jpg',
    'https://thesafari.kr/web/upload/NNEditor/20221215/KakaoTalk_20221215_142038582_14.jpg',
    'https://thesafari.kr/web/product/big/202307/9b2db47811b80e65831b25b838fc438f.png',
    'https://thesafari.kr/web/product/big/202307/aa7a55d38ce8e503b67038cd535a8abc.png',
    'https://thesafari.kr/web/product/big/202306/e55d090cda23141a8ed63a5b4c4f42bf.jpg',
];

const gender: EntityGender[] = ['Female', 'Male', 'Uncategorized'];

const name = [
    '꼴등',
    '삼진',
    '처등',
    '키보',
    '가리',
    '측질',
    '면강',
    '흥부',
    '대못',
    '경도',
    '꼴등1',
    '삼진1',
    '처등1',
    '키보1',
    '가리1',
    '측질1',
    '면강1',
    '흥부1',
    '대못1',
    '경도1',
];

const createVariety = () => {
    const random분류리스트Index = faker.number.int({ min: 0, max: 분류리스트.length - 1 });
    const classification = 분류리스트[random분류리스트Index];

    const new종리스트 = 종리스트[classification] ?? [];
    const random종리스트Index = faker.number.int({ min: 0, max: Math.max(0, new종리스트.length - 1) });
    const species = new종리스트[random종리스트Index];

    const new상세종리스트 = 상세종리스트[species] ?? [];
    const random상세종종리스트Index = faker.number.int({ min: 0, max: Math.max(0, new상세종리스트.length - 1) });
    const detailedSpecies = new상세종리스트[random상세종종리스트Index];

    const new모프로컬리스트 = 모프로컬리스트[detailedSpecies] ?? [];
    const random모프로컬리스트Index = faker.number.int({ min: 0, max: Math.max(0, new모프로컬리스트.length - 1) });
    const morph = new모프로컬리스트[random모프로컬리스트Index];

    return {
        classification,
        species,
        detailedSpecies,
        morph,
    };
};

export const diaryEntityData: InfiniteData<InfiniteState<FetchEntityListResponse[]>, number> = {
    pageParams: [1],
    pages: [
        {
            items: range(20).map((_, index) => ({
                entity: {
                    id: fakerKO.string.uuid(),
                    gender: gender[index % 3],
                    hatching: faker.date.anytime(),
                    name: name[index],
                    variety: createVariety(),
                    weight: range(365).map(() => ({
                        date: faker.date.anytime(),
                        weight: `${faker.number.float({ min: 0, max: 200 })}g`,
                    })),
                    image: {
                        src: image[index],
                    },
                },
            })),
            nextPage: 1,
        },
    ],
};
