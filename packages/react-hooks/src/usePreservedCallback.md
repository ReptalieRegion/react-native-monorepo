# usePreservedCallback

컴포넌트가 mount 되어 있는 동안 인자로 주어진 callback 함수의 레퍼런스를 보존합니다.

주어진 callback을 React의 Ref 로 감싸서 레퍼런스를 보존합니다.

```tsx
function usePreservedCallback<Callback extends (...args: any[]) => any>(callback: Callback): Callback;
```

## Usage

```tsx
const callback = usePreservedCallback(() => {
    alert('나는 절대로 레퍼런스가 바뀌지 않아');
});

useEffect(() => {
    // 이 Effect는 1번만 호출된다.
    callback();
}, [callback]);
```

## Reference

@toss/react의 usePreservedCallback 참고했습니다.

https://slash.page/ko/libraries/react/react/src/hooks/usePreservedCallback.i18n
