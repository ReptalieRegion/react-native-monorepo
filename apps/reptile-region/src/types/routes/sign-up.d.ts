declare module '<routes/sign-up>' {
    /** SharePost 시작 */
    type Step1Props = {
        userId: string;
        recommendNickname: string;
    };

    type SignUpParamList = {
        step1: Step1Props;
    };
    /** SharePost 끝 */
}
