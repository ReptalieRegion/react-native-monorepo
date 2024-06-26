# usePreservedReference

comparator로 비교했을 때 값이 변경되었을 때에만 레퍼런스를 변경하도록 합니다.

기본으로는 JSON.stringify를 했을 때 동일한 값이면 레퍼런스를 유지합니다.

```tsx
// 값의 동일성을 검증을 JSON.stringify로 하는 검증 함수
function areDeeplyEqual<T extends NotNullishValue>(x: T, y: T) {
    return JSON.stringify(x) === JSON.stringify(y);
}

function usePreservedReference<T extends NotNullishValue>(
    // 레퍼런스를 보존할 값
    value: T,
    // 값의 동일성을 검증하는 함수
    // default: areDeeplyEqual
    areValuesEqual: (a: T, b: T) => boolean = areDeeplyEqual,
): T;
```

## Usage

```tsx
const params = usePreservedReference(loggerParams, areParamsEqual);
```

## Reference

@toss/react의 usePreservedReference 참고했습니다.

https://slash.page/ko/libraries/react/react/src/hooks/usePreservedReference.i18n
