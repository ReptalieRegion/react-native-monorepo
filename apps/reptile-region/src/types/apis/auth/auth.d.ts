declare module '<api/auth>' {
    import type { ServerAPI } from '<api/utils>';

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

    /** GET 시작 */
    type NicknameDuplicateCheckRequest = {
        nickname: string;
    };

    type NicknameDuplicateCheckResponse = {
        isDuplicate: boolean;
    };

    type NicknameDuplicateCheck = ServerAPI<NicknameDuplicateCheckRequest, NicknameDuplicateCheckResponse>;
    /** GET 끝 */

    /** Post 시작 */
    /** 공개키 발급 시작 */
    type FetchAuthTokenAndPublicKeyResponse = {
        publicKey: string;
        authToken: string;
    };

    type FetchAuthTokenAndPublicKey = ServerAPI<undefined, FetchAuthTokenAndPublicKeyResponse>;
    /** 공개키 발급 끝 */

    /** 카카오 로그인 시작 */
    type PostKakaoAuthRequest = {
        socialId: string;
        publicKey: string;
        authToken: string;
    };

    type PostKakaoAuth = ServerAPI<AuthRequest, AuthResponse>;
    /** 카카오 로그인 끝 */

    /** 애플 로그인 시작 */
    type PostAppleAuth = ServerAPI<AuthRequest, AuthResponse>;
    /** 애플 로그인 끝 */

    /** 구글 로그인 시작 */
    type PostGoogleRequest = {
        idToken: string;
    };

    type PostGoogleAuth = ServerAPI<PostGoogleRequest, AuthResponse>;
    /** 구글 로그인 끝 */

    /** 리프레시 토큰 요청 시작 */
    type RefreshTokenRequest = {
        refreshToken: string;
    };

    type RefreshToken = ServerAPI<RefreshTokenRequest, AuthTokens>;
    /** 리프레시 토큰 요청 끝 */

    /** 회원가입 절차 시작 */

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
    /** 회원가입 절차 끝 */
    /** Post 끝 */

    /** DELETE 시작 */
    /** 로그아웃 시작 */
    type SignOutResponse = {
        message: 'Success';
    };

    type SignOut = ServerAPI<void, SignInResponse>;
    /** 로그아웃 시작 */
    /** DELETE 끝 */
}
