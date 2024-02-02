# crawl-react-native

yarn workspace로 구성한 React Native 모노레포입니다.

## 구성

-   `apps` - 앱 단위의 프로젝트
    -   `crawl`
        -   파충류 커뮤니티 앱
        -   [README](./apps/crawl/README.md)
    -   `playground`
        -   여러 라이브러리를 테스트 해볼 수 있는 앱
        -   [README](./apps/playground/README.md)
-   `packages` - 라이브러리 단위의 프로젝트
    -   `async-boundary`
        -   Suspense, ErrorBoundary를 동시에 처리하는 컴포넌트입니다.
        -   toss/slash를 참고하고 있습니다.
        -   [README](./packages/async-boundary/README.md)
    -   `bottom-sheet`
        -   reanimated, gesture-handler로 구현되어 있는 바텀시트입니다.
        -   [README](./packages/bottom-sheet/README.md)
    -   `calendar`
        -   캘린더 기능을 제공합니다.
        -   [README](./packages/calendar/README.md)
    -   `camera-album`
        -   기기에 있는 사진을 격자 형태의 앨범으로 보여주고 사진 저장 기능을 제공합니다.
        -   [README](./packages/camera-album/README.md)
    -   `design-system`
        -   크롤의 디자인 시스템을 제공합니다.
        -   현재는 Typo, color만 제공있고 구상하고 있습니다.
        -   [README](./packages/design-system/README.md)
    -   `error-boundary`
        -   선언적으로 에러관리하기 위해서 사용하는 패키지입니다.
        -   toss/slash를 참고하고 있습니다.
        -   [README](./packages/error-boundary/README.md)
    -   `image-crop`
        -   인스타그램처럼 zoom으로 이미지를 Crop할 수 있는 패키지입니다.
        -   [README](./packages/image-crop/README.md)
    -   `overlay-manager`
        -   바텀시트, 모달, 토스트 메시지 등 별도의 UI레이어에 띄우는 기능을 제공합니다. (선언적으로 관리)
        -   toss/slash를 참고하고 있습니다.
        -   [README](./packages/overlay-manager/README.md)
    -   `react-hooks`
        -   React 프로젝트에서 사용할 수 있는 다양한 custom hook이 모여있는 패키지입니다.
        -   [README](./packages/react-hooks/README.md)
    -   `utils`
        -   Javascript 프로젝트에서 사용할 수 있는 다양한 유틸리티 함수가 모여있는 패키지 입니다.
        -   [README](./packages/react-hooks/README.md)
