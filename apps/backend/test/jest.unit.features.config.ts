import { type Config } from 'jest';
import base from './jest.base.config';

export default {
  ...base,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.unit.steps.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
} satisfies Config;
