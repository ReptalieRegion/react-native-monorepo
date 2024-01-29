# useLoading

loading을 쉽게 관리할 수 있는 hook입니다.

```tsx
function useLoading(): {
    loading: boolean;
    startLoading: () => void;
    endLoading: () => void;
};
```

## Usage

```tsx
const { loading, startLoading, endLoading } = useLoading();

useEffect(() => {
    startLoading();
    fetch('http://localhost:3333/api/test').finally(() => {
        endLoading();
    });
}, []);

console.log(loading);
```
