import { renderHook, act } from '@testing-library/react-hooks';
import useInput from '@/hooks/useInput';

describe('useInput hook test', () => {
  test('setValue is message', () => {
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
});
