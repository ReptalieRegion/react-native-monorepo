# useToggle

toggle기능을 하는 hook입니다.

```ts
function useToggle(defaultValue?: boolean): [boolean, () => void];
```

# Usage

```tsx
const [bool, toggle] = useToggle(false);
```
