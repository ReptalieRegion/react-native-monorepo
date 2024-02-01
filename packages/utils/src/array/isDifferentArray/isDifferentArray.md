# isDifferentArray

주어진 두 배열이 서로 다른지 검사합니다.

```ts
function isDifferentArray(a: unknown[], b: unknown[]): boolean;
```

## Usage

```ts
isDifferentArray([1, 2, 3], [1, 2, 3]); // false
isDifferentArray([1, 2, 3], [1]); // true

const foo = { foo: 'bar' };
const bar = { bar: 'foo' };
isDifferentArray([foo, bar], [foo, bar]); // false
isDifferentArray([foo, bar], [{ foo: 'bar' }, { bar: 'foo' }]); // true
```

## References

@toss/utils의 isDifferentArray 참고했습니다.

https://slash.page/ko/libraries/common/utils/src/array/isDifferentArray.i18n
