import { renderHook } from '@testing-library/react';

import { useDebounce } from './useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    const completionTime = 500;
    const timeBeforeCompletion = 490;
    const remainingTime = 10;

    it('useDebounce 안에 있는 callback 함수는 한번만 실행되게 설계되어 있다.', () => {
        const callback = jest.fn();

        const { result } = renderHook(() => useDebounce(callback, completionTime));

        result.current();

        expect(callback).not.toHaveBeenCalled();

        jest.advanceTimersByTime(completionTime);
        jest.advanceTimersByTime(completionTime);
        jest.advanceTimersByTime(completionTime);

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('정해놓은 시간이 넘기 전에 함수가 실행되지 않습니다.', () => {
        const callback = jest.fn();

        const { result } = renderHook(() => useDebounce(callback, completionTime));

        result.current();

        jest.advanceTimersByTime(timeBeforeCompletion);

        expect(callback).not.toHaveBeenCalled();

        jest.advanceTimersByTime(remainingTime);

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('정해놓은 시간이 넘기 전에 debounce가 트리거 되면 시간은 다시 리셋됩니다.', () => {
        const callback = jest.fn();

        const { result } = renderHook(() => useDebounce(callback, completionTime));

        result.current();

        jest.advanceTimersByTime(timeBeforeCompletion);

        expect(callback).not.toHaveBeenCalled();

        result.current();

        jest.advanceTimersByTime(timeBeforeCompletion);

        expect(callback).not.toHaveBeenCalled();

        jest.advanceTimersByTime(completionTime);

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('unmount 되면 콜백함수는 실행되지 않습니다.', () => {
        const callback = jest.fn();

        const { result, unmount } = renderHook(() => useDebounce(callback, completionTime));

        result.current();

        jest.advanceTimersByTime(timeBeforeCompletion);

        expect(callback).not.toHaveBeenCalled();

        unmount();

        jest.runOnlyPendingTimers();

        expect(callback).not.toHaveBeenCalled();
    });
});
