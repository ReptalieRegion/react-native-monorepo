# `크롤`

크롤은 파충류, 양서류, 절지류에 특화된 소셜 플랫폼 앱입니다.

## 기본적으로 필요한 파일입니다.

| 위치    | 파일이름                                                                                                                             |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| root    | `.env`, `.env.development`, `.env.production`, `.env.test`                                                                           |
| android | `google-play.json`, `fastlane/.env.default`, `app/google-services.json`, `app/my-upload-key.keystore`                                |
| ios     | `.xcode.env.local`, `firebase/devlop/GoogleService-Info.plist`, `firebase/product/GoogleService-Info.plist`, `fastlane/.env.default` |

## Script

`android:staging:r`

-   안드로이드 릴리즈 모드 로컬 환경 실행 (로컬 백 서버도 같이 실행해야됩니다.)

`android:staging:d`

-   안드로이드 디버그 모드 로컬 환경 실행 (로컬 백 서버도 같이 실행해야됩니다.)
-   백 작업도 같이 진행할 때 사용

`android:dev:r`

-   안드로이드 릴리즈 모드 데브 환경 실행
-   내부 테스트 배포할 때 사용

`android:dev:d`

-   안드로이드 디버그 모드 데브 환경 실행
-   유지보수 할 때 사용

`android:prod:r`

-   안드로이드 릴리즈 모드 프로덕션 환경 실행
-   실제 배포할 때 환경

`android:prod:d`

-   안드로이드 디버그 모드 프로덕션 환경 실행

`ios:test`

-   아이폰 디버그 모드 로컬 환경 실행
-   백 작업 같이 진행할 때 사용

`ios:dev`

-   아이폰 디버그 모드 데브 환경 실행
-   유지보수 할 때 사용

`ios:prod`

-   아이폰 디버그 모드 데브 환경 실행
