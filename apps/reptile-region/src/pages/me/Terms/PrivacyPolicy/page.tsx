import React from 'react';

import { TERMS_TYPE, type Terms } from '../type';

import { TermsList } from '@/components/me/molecules';

const TERMS_OF_USE_MAP: Array<Terms> = [
    {
        type: TERMS_TYPE.TITLE,
        contents: "'크롤'을 이용해 주셔셔 감사합니다.\n개인정보 취급방침 안내사항입니다.",
    },
    {
        type: TERMS_TYPE.NUMBER_ARTICLE,
        subTitle: '제 1조 (목적)',
        contents: [
            '개인정보란 생존하는 개인에 관한 정보로서 당해 정보에 포함되어 있는 사항에 의하여 당해 개인을 식별할 수 있는 정보(당해 정보만으로는 특정 개인을 식별할 수 없더라도 다른 정보와 용이하게 결합하여 식별할 수 있는 것을 포함합니다.)를 말합니다.',
            '크롤(이하 "회사"라 함)는 귀하의 개인정보보호를 매우 중요시하며, 개인정보보호법, 정보통신망 이용촉진 및 정보보호에 관한 법률상의 개인정보보호규정 및 방송통신위원회가 제정한 개인정보보호지침을 준수하고 있습니다. 회사는 개인정보처리방침을 통하여 귀하께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다. ',
        ],
    },
];

export default function PrivacyPolicyPage() {
    return <TermsList data={TERMS_OF_USE_MAP} />;
}
