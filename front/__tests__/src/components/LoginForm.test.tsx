import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginForm } from '@/components/organisms';
import {
  UseModalDispatchContext,
  UseModalStateContext,
} from '@/../store/modalStore';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('login form test', () => {
  let container: RenderResult;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  beforeEach(() => {
    container = render(
      <UseModalStateContext.Provider
        value={{
          basic: [],
          custom: [],
        }}
      >
        <UseModalDispatchContext.Provider value={jest.fn()}>
          <QueryClientProvider client={queryClient}>
            <LoginForm />
          </QueryClientProvider>
        </UseModalDispatchContext.Provider>
      </UseModalStateContext.Provider>
    );
  });

  afterEach(cleanup);

  it('login render test', () => {
    expect(screen.getByText('로그인')).toBeInTheDocument();
  });

  it('login input test', async () => {
    const idInput: any = container.getByRole('textbox', { name: '' });
    const psInput: any =
      container.getByPlaceholderText('비밀번호를 입력해주세요.');

    expect(idInput.value).toBe('');
    fireEvent.change(idInput, { target: { value: 'sy1234@gmail.com' } });
    expect(idInput.value).toBe('sy1234@gmail.com');

    expect(psInput.value).toBe('');
    fireEvent.change(psInput, { target: { value: '12341234' } });
    expect(psInput.value).toBe('12341234');
  });

  it('validation check', async () => {
    const button = screen.getByRole('button', { name: '로그인' });
    fireEvent.click(button);
    await waitFor(() =>
      expect(screen.getByText('email은 필수 항목입니다.')).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.getByText('비밀번호는 필수 항목입니다.')
      ).toBeInTheDocument()
    );
  });
});
