// 회원가입 절차 - 1 (닉네임 등록)
type Step1Params = {
    user: {
        id: string;
        recommendNickname: string;
    };
};

// 로그인 완료 시
type SignInParams = {
    successNavigate: 'BACK' | 'ME';
};

export type { SignInParams, Step1Params };
