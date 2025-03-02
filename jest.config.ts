// module.exports = {
//   preset: 'jest-preset-angular',
//   setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
// };

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  // transform: {
  //   '^.+\\.(ts|html)$': 'jest-preset-angular',
  // },
  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
  },
  collectCoverage: true,
  coverageReporters: ['html', 'lcov', 'text-summary'],
  coverageDirectory: 'coverage/jest',
};
