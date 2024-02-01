# `async-boundary`
코드를 선언적으로 관리하기 위해 도입했습니다.

## Install
```
yarn workspace <설치할 패키지 이름> add @crawl/async-boundary
```

## AsyncBoundary
`Suspense`, `ErrorBoundary`를 동시에 처리하는 컴포넌트입니다. `ref`가 제공하는 `reset()`함수로 `Error`상태를 초기화할 수 있습니다.

### Example
```tsx
const ref = useRef<{ reset: () => void }>();

<AsyncBoundary
  ref={ref}
  // 로딩 중일 때 (Suspense 상태가 발생했을 때) 렌더할 컴포넌트
  pendingFallback={<div>로딩 중입니다.</div>}
  // 에러가 발생했을 때 렌더할 컴포넌트. 첫 번째 인자로는 발생한 에러가 전달됩니다.
  rejectedFallback={error => <div>에러가 발생했습니다. {error.message}</div>}
>
  <Suspense_일으키는_컴포넌트 />
</AsyncBoundary>;

// AsyncBoundary가 catch한 에러를 clear하기
ref.current?.reset();
```

## withAsyncBoundary
`AsyncBoundary`로 감싸는 HOC입니다.
```tsx
const MyComponent = withAsyncBoundary(Suspense를_일으키는_컴포넌트, {
  // 로딩 중일 때 보여줄 컴포넌트
  pendingFallback: <div>로딩 중입니다.</div>,
  // 에러가 발생했을 때 보여줄 컴포넌트. 첫 번째 인자로는 발생한 에러가 전달됩니다.
  rejectedFallback: error => <div>에러가 발생했습니다. {error.message}</div>,
});
```

## References
toss/slash의 async-boundary를 참고했습니다.

https://github.com/toss/slash/tree/main/packages/react/async-boundary
