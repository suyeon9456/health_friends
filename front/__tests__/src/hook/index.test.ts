import { renderHook, act } from '@testing-library/react-hooks';
import {
  useInput,
  useCheckbox,
  useDateFormat,
  useRate,
  useRematchRate,
} from '@/hooks/index';

describe('custom hooks test', () => {
  test('useInput test', () => {
    const { result }: any = renderHook((defaultValue: any) => useInput('test'));
    expect(result?.current[0]).toEqual('test');
    act(() => {
      result?.current[1]({ target: { value: 'handler test' } });
    });
    expect(result?.current[0]).toEqual('handler test');
    act(() => {
      result?.current[2]('setValue test');
    });
    expect(result?.current[0]).toEqual('setValue test');
  });
  test('useCheckbox test', () => {
    const { result }: any = renderHook(() => useCheckbox<string>([]));
    expect(result?.current[0]).toEqual([]);
    act(() => {
      // check 테스트
      result?.current[1](true, 'open');
    });
    expect(result?.current[0]).toEqual(['open']);
    act(() => {
      // check 해제 테스트
      result?.current[1](false, 'open');
    });
    expect(result?.current[0]).toEqual([]);
    act(() => {
      result?.current[2](['open', 'close']);
    });
    expect(result?.current[0]).toEqual(['open', 'close']);
  });
  test('useDateFormat test', () => {
    const { result }: any = renderHook(() =>
      useDateFormat(new Date(2022, 4, 12), 'yyyy-MM-dd')
    );
    expect(result?.current).toEqual('2022-05-12');
  });
  test('useRate test', () => {
    const { result }: any = renderHook(
      ({ defaultValue }) => useRate(defaultValue),
      {
        initialProps: {
          defaultValue: {
            total: 100,
            number: 30,
          },
        },
      }
    );
    expect(result?.current[0]).toEqual(30);
  });
  test('useRematchRate test', () => {
    const { result }: any = renderHook(() => useRematchRate(30, 100));
    expect(result?.current).toEqual(30);
  });
});
