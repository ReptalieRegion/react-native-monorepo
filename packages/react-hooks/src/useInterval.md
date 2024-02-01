# useInterval

interval를 쉽게 사용할 수 있는 hook입니다.

```tsx
function useInterval(
    callback: () => void,
    delay: number | null,
): {
    pause: () => void;
    resume: () => void;
};
```

## Usage

```tsx
const [index, setIndex] = useState(0);
const { pause, resume } = useInterval(() => {
    setIndex((prev) => prev + 1);
}, 4000);

<button onClick={pause}>일시정지</button>
<button onClick={resume}>재생</button>
```
