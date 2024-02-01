# `error-boundary`

-   선언적으로 에러관리하기 위해서 사용하는 패키지입니다.

## Installation

```
yarn workspace <설치할 패키지 이름> add @crawl/error-boundary
```

## ErrorBoundary

children의 render/useEffect에서 발생한 에러를 잡아서 renderFallback으로 주어진 컴포넌트를 렌더링합니다.

### Usage

```tsx
<ErrorBoundary
    // 에러가 발생하면 그려질 컴포넌트입니다.
    // 첫 번째 인자는 잡힌 에러를 나타냅니다.
    renderFallback={(error) => <div>에러가 발생했어요. {error.message}</div>}
    // 에러가 발생하면 호출되는 callback입니다.
    // 첫 번째 인자는 잡힌 에러, 두 번째 인자는 에러가 발생한 컴포넌트의 stack을 나타냅니다.
    // componentStack의 타입은 `string` 입니다.
    onError={(error, { componentStack }) => {
        alert(error.message);
        console.log(componentStack);
    }}
    // 배열 안에 담긴 값이 바뀌면 ErrorBoundary로 잡힌 에러를 초기화합니다.
    // 값이 동일한지 여부는 `Object.is()` 로 검증합니다.
    // @default []
    resetKeys={['key1', 'key2']}
    // 에러가 초기화되면 호출됩니다.
    // 타입은 `() => void` 입니다.
    onReset={() => {}}
    // 잡힌 에러를 무시하고 다시 throw 할지 여부를 반환합니다.
    // true 가 반환될 경우, error를 이 ErrorBoundary에서 잡지 않고 throw 합니다.
    ignoreError={(error) => error.message.includes('어쩌구')}
>
    <에러를_발생시킬_수_있는_컴포넌트 />
</ErrorBoundary>
```

## withErrorBoundary

```tsx
const MyComponent = withErrorBoundary(에러를_발생시킬_수_있는_컴포넌트, {
    renderFallback: ({ error }) => <div>에러가 발생했어요. {error.message}</div>,
});
```

### Usage

## useErrorBoundary

Error Boundary가 인지할 수 있게 에러를 상위로 전달해주는 훅입니다.

### Usage

```tsx
const throwError = useErrorBoundary();

<Button
    onClick={() => {
        if (someCondition) {
            // 가장 가까운 ErrorBoundary로 new Error('에러 발생')이 throw됩니다.
            throwError(new Error('에러 발생'));
        }
    }}
/>;
```

## ErrorBoundaryGroup

여러 ErrorBoundary들을 한 번에 관리하기 위한 컴포넌트입니다.

### Usage

```tsx
const Example = () => (
    <ErrorBoundaryGroup>
        <ErrorBoundaryGroupReset trigger={({ reset }) => <button onClick={reset}>Reset All</button>} />
        <ErrorBoundary />
        <ErrorBoundary />
        <NestedErrorBoundary />
    </ErrorBoundaryGroup>
);

const NestedErrorBoundary = () => {
    return <ErrorBoundary />;
};

const ErrorBoundaryGroupReset = ({ trigger: Trigger }) => {
    const { reset } = useErrorBoundaryGroup(); // ErrorBoundaryGroup의 children으로 있는 ErrorBoundary들이 내부적으로 공유하는 resetKey를 새로 발급해 모두 reset 하고 싶다면 useErrorBoundaryGroup hook을 활용하면 됩니다.

    return <Trigger reset={reset} />;
};
```

## withErrorBoundaryGroup

ErrorBoundaryGroup을 감싸는 HOC입니다.

### Usage

```tsx
const MyComponent = withErrorBoundaryGroup(여러_ErrorBoundary가_포함된_컴포넌트, {
    blockOutside: true,
});
```

## References

toss/slash의 error-boundary를 참고했습니다.

https://slash.page/ko/libraries/react/error-boundary/src/errorboundary.i18n/
