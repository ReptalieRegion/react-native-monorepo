import type { ServerAPI } from '../utils';

/**
 * 공통 타입
 */
type AuthTokens = {
    accessToken: string;
    refreshToken: string;
};

type AuthRequest = {
    socialId: string;
    publicKey: string;
    authToken: string;
};

interface SignInResponse {
    type: 'SIGN_IN';
    accessToken: string;
    refreshToken: string;
}

interface SignUpRegister0 {
    type: 'SIGN_UP';
    joinProgress: 'REGISTER0';
    nickname: string;
    userId: string;
}

type AuthResponse = SignInResponse | SignUpRegister0;

/**
 *
 * GET
 */
// 닉네임 중복체크
type NicknameDuplicateCheckRequest = {
    nickname: string;
};

type NicknameDuplicateCheckResponse = {
    isDuplicate: boolean;
};

type NicknameDuplicateCheck = ServerAPI<NicknameDuplicateCheckRequest, NicknameDuplicateCheckResponse>;

/**
 *
 * POST
 */
// 인증 토큰 및 공개키 발급
type FetchAuthTokenAndPublicKeyResponse = {
    publicKey: string;
    authToken: string;
};

type FetchAuthTokenAndPublicKey = ServerAPI<undefined, FetchAuthTokenAndPublicKeyResponse>;

// 카카오 로그인
type PostKakaoAuthRequest = {
    socialId: string;
    publicKey: string;
    authToken: string;
};

type PostKakaoAuth = ServerAPI<AuthRequest, AuthResponse>;

// 애플 로그인
type PostAppleAuth = ServerAPI<AuthRequest, AuthResponse>;

// 구글 로그인
type PostGoogleRequest = {
    idToken: string;
};

type PostGoogleAuth = ServerAPI<PostGoogleRequest, AuthResponse>;

// 리프레시 토큰 갱신

type RefreshToken = ServerAPI<void, AuthTokens>;

// 회원가입 진행 단계에 따른 데이터 저장
type Register0Request = {
    authToken: string;
    userId: string;
    nickname: string;
    joinProgress: 'REGISTER0';
};

type Register0Response = {
    type: 'SIGN_UP';
    joinProgress: 'DONE';
    accessToken: string;
    refreshToken: string;
};

type Register0 = ServerAPI<Register0Request, Register0Response>;

type JoinProgress = Register0;

/**
 *
 * DELETE
 */
// 로그아웃
type SignOutResponse = {
    message: 'Success';
};

type SignOut = ServerAPI<void, SignInResponse>;

export type {
    AuthResponse,
    AuthTokens,
    FetchAuthTokenAndPublicKey,
    JoinProgress,
    NicknameDuplicateCheck,
    PostAppleAuth,
    PostGoogleAuth,
    PostKakaoAuth,
    PostKakaoAuthRequest,
    RefreshToken,
    Register0,
    SignInResponse,
    SignOut,
    SignOutResponse,
    SignUpRegister0,
};
