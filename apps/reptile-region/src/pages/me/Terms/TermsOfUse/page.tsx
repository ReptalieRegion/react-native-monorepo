import React from 'react';

import { TERMS_TYPE, type Terms } from '../type';

import { TermsList } from '@/components/me/molecules';

const TERMS_OF_USE_MAP: Array<Terms> = [
    {
        type: TERMS_TYPE.TITLE,
        contents: "'크롤'을 이용해 주셔셔 감사합니다.\n서비스 관련 이용약관입니다.",
    },
    {
        type: TERMS_TYPE.ARTICLE,
        subTitle: '제 1조 (목적)',
        contents:
            '이 약관은 크롤(이하 "회사"라 합니다)이 제공하는 크롤 서비스(이하 "서비스"라 합니다)와 관련하여, 회사와 이용고객 간에 서비스의 이용조건 및 절차, 회사와 회원간의 권리, 의무 및 기타 필요한 사항을 규정함을 목적으로 합니다. 본 약관은 PC통신, 스마트폰(안드로이드폰, 아이폰 등) 앱 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 준용됩니다.',
    },
    {
        type: TERMS_TYPE.NUMBER_ARTICLE,
        subTitle: '제 2조 (용어의 정의)',
        contents: [
            '"회원"이라 함은 "크롤"에 개인정보를 제공하여 회원등록을 한 자로서, "크롤"의 정보를 지속적으로 제공받으며, "크롤"이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 의미합니다.',
            '"비회원"이라 함은 "회원"으로 가입하지 않고 "회사"가 제공하는 서비스를 이용하는 자를 말합니다.',
        ],
    },
];

export default function TermsOfUsePage() {
    return <TermsList data={TERMS_OF_USE_MAP} />;
}
