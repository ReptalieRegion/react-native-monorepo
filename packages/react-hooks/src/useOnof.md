# useOnOff

useLoading과 하는 역할은 같지만 의미상 분리해서 사용하는 hook입니다.

```tsx
function useOnOff(defaultValue?: boolean): {
    state: boolean;
    on: () => void;
    off: () => void;
};
```

## Usage

```tsx
const { state, on, off } = useOnOff();

<button onClick={on}>켜기</button>;
<button onClick={off}>끄기</button>;
```
