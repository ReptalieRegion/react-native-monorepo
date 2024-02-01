# overlay-manager

Overlay를 선언적으로 다루기 위한 패키지입니다.

-   Overlay는 바텀시트, 모달, 토스트 메시지 등 별도의 UI레이어에 띄우는 컴포넌트를 말합니다.
-   여러개의 Overlay를 만들 수 있습니다.
-   Promise와 함께 사용할 수 있습니다.

```tsx
function useOverlay(options?: {
    // useOverlay를 호출한 컴포넌트가 unmount 되면 overlay도 같이 unmount(=exit) 됩니다.
    // exitOnUnmount의 값을 false로 설정하였다면 useOverlay를 호출한 컴포넌트가 unmount 되도 overlay가 같이 unmount 되지 않습니다.
    // 따라서 원하는 타이밍에 overlay의 exit 함수를 직접 실행하여 overlay를 unmount 시킬 수 있습니다. exit 함수를 실행시키지 않는다면
    // 등록된 overlay가 메모리 상에 계속 남아있게 됩니다. exitOnUnmount의 값을 false로 설정하였다면 반드시 exit 함수를 실행시켜주세요.
    // close와 exit이 분리되어 있는 이유는 Overlay를 닫으면서 fade-out 애니메이션을 주고 싶을 때 close와 동시에 unmount시켜버리면 애니메이션이 먹히기때문입니다.
    // default: true
    exitOnUnmount?: boolean;
}): {
    open: (overlayElement: CreateOverlayElement) => void;
    close: () => void;
    exit: () => void;
};
```

## Usage

```tsx
// App.tsx
import { OverlayProvider } from '@crawl/overlay-manager';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <OverlayProvider>
            <Component {...pageProps} />
        </OverlayProvider>
    );
}

// Page.tsx
import { useOverlay } from '@toss/use-overlay';

const overlay = useOverlay();
const openFooConfirmDialog = () => {
    return new Promise<boolean>((resolve) => {
        overlay.open(({ isOpen, close }) => (
            <FooConfirmDialog
                open={isOpen}
                onClose={() => {
                    resolve(false);
                    close();
                }}
                onConfirm={() => {
                    resolve(true);
                    close();
                }}
            />
        ));
    });
};

await openFooConfirmDialog();

// ConfirmDialog의 confirmButton을 누르거나 onClose가 호출된 후
console.log('dialog closed');
```

## References

@toss/use-overlay를 참고했습니다.

https://slash.page/ko/libraries/react/use-overlay/src/useoverlay.i18n/
