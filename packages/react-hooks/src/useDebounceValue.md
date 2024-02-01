# useDebounceValue

전달 받은 값을 debounce하고 callback함수를 실행해줄 수 있는 hook입니다.

```ts
function useDebounceValue<T>(value: T, delay?: number, callback?: () => void): T;
```

## Usage

```tsx
const [name, setName] = useState('');
const debouncedName = useDebounceValue(name, 500, () => {
    console.log('debouncedValue');
});
```
