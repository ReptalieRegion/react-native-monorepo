# useDebounce

`lodash/debounce`를 리렌더링이 발생해도 debounce의 역할을 할 수 있는 hook입니다.

```ts
function useDebounce<F extends (...args: any[]) => any>(
    callback: F,
    wait: number,
    options?: Parameters<typeof debounce>[2],
): DebouncedFunc<F>;
```

## Usage

```tsx
const handlePress = useDebounce(() => {
    console.log('안녕하세요');
}, 300);
```

## References

@toss/react의 useDebounce를 참고했습니다.

https://slash.page/ko/libraries/react/react/src/hooks/useDebounce.i18n
