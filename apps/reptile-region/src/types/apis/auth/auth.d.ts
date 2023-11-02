declare module '<api/auth>' {
    import type { ServerAPI } from '<api/utils>';

    type Auth = {
        accessToken: string;
        refreshToken: string;
    };

    type JoinProgress = 'REGISTER0' | 'DONE';

    type AuthResponse =
        | {
              type: 'SIGN_IN';
              accessToken: string;
              refreshToken: string;
          }
        | {
              type: 'SIGN_UP';
              joinProgress: JoinProgress;
          };

    /** GET 시작 */
    /** 공개키 발급 시작 */
    type FetchAuthTokenAndPublicKeyResponse = {
        publicKey: string;
        authToken: string;
    };

    type FetchAuthTokenAndPublicKey = ServerAPI<undefined, FetchAuthTokenAndPublicKeyResponse>;
    /** 공개키 발급 끝 */
    /** GET 끝 */

    /** Post 시작 */
    /** 카카오 로그인 시작 */
    type PostKakaoAuthRequest = {
        socialId: string;
        publicKey: string;
        authToken: string;
    };

    type PostKakaoAuth = ServerAPI<PostKakaoAuthRequest, AuthResponse>;
    /** 카카오 로그인 끝 */

    /** 리프레시 토큰 요청 시작 */
    type RefreshTokenResponse = {
        accessToken: string;
        refreshToken: string;
    };

    type RefreshToken = ServerAPI<undefined, RefreshTokenResponse>;
    /** 리프레시 토큰 요청 끝 */
    /** Post 끝 */
}
