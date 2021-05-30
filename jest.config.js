module.exports = {
  testRegex: './src/tests/.*\\.spec\\.ts',
  testEnvironment: 'node',
  preset: 'ts-jest',
  // TS takes precedence as we want to avoid build artifacts from being required instead of up-to-date .ts file.
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverage: true,
  verbose: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/index.ts',
    '!src/migrations/**',
    '!src/**/models/**/*',
    '!src/**/interfaces/**/*',
    '!src/**/app.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.d.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
};
