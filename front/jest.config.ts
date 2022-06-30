import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-svg-transformer', // <- 새롭게 추가
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': `<rootDir>/__mocks__/fileMock.ts`,
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@/atoms/(.*)$': '<rootDir>/components/atoms/$1',
    '^@/component/(.*)$': '<rootDir>/components/organisms/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/@types/',
  ],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
