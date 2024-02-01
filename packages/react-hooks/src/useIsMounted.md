# useIsMounted

Component의 mount 여부를 알 수 있는 hook 입니다.

```tsx
function useIsMounted(): boolean;
```

## Usage

```tsx
const isMounted = useIsMounted();

useEffect(() => {
    if (!isMounted) {
        return;
    }

    console.log('mount 완료');
}, [isMounted]);
```

## References

@toss/react의 useIsMounted 참고했습니다.

https://slash.page/ko/libraries/react/react/src/hooks/useIsMounted.i18n
