import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { request } from 'http';

export const useCustomHook = () => {
  return useQuery('customHook', () => ({
    age: '2',
    career: '3',
    createdAt: '2021-10-06T17:23:27.000Z',
    email: 'sy1234@gmail.com',
    gender: 'female',
    id: 8,
    nickname: '뚜뚜니니',
    password: '$2b$12$EXwTt2R8VFP6X8yPfH6U/u1nIxIaOsbVYW4K7rVZbFADzzMHRAXdG',
    role: '2',
    updatedAt: '2022-04-13T08:20:53.000Z',
  }));
};

const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('/greeting', (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json({ greeting: 'hello there' }));
  })
);

function useFetchData() {
  return useQuery('fetchData', () => request('http://localhost:6015/user'));
}

describe('Post', () => {
  // establish API mocking before all tests
  beforeAll(() => server.listen());
  // reset any request handlers that are declared as a part of our tests
  // (i.e. for testing one-time error scenarios)
  afterEach(() => server.resetHandlers());
  // clean up once the tests are done
  afterAll(() => server.close());
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  it('react query test', async () => {
    const { result, waitFor } = renderHook(() => useCustomHook(), { wrapper });
    await waitFor(() => result.current.isSuccess);
    // expect(result.current.data).toEqual({
    //   age: '2',
    //   career: '3',
    //   createdAt: '2021-10-06T17:23:27.000Z',
    //   email: 'sy1234@gmail.com',
    //   gender: 'female',
    //   id: 8,
    //   nickname: '뚜뚜니니',
    //   password: '$2b$12$EXwTt2R8VFP6X8yPfH6U/u1nIxIaOsbVYW4K7rVZbFADzzMHRAXdG',
    //   role: '2',
    //   updatedAt: '2022-04-13T08:20:53.000Z',
    // });
  });
});
