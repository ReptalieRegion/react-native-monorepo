declare module '<api/auth>' {
    import type { ServerAPI } from '<api/utils>';

    type AuthTokens = {
        accessToken: string;
        refreshToken: string;
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

    type PostKakaoAuth = ServerAPI<PostKakaoAuthRequest, AuthResponse>;
    /** 카카오 로그인 끝 */

    /** 리프레시 토큰 요청 시작 */
    type RefreshToken = ServerAPI<undefined, AuthTokens>;
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
}
