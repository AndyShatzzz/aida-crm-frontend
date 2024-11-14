module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended'],
  overrides: [
    {
      env: { node: true },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: { sourceType: 'script' }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    indent: ['warn', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['warn', 'single'],
    semi: ['error', 'always'],
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/react-in-jsx-scope': 'off',
    'max-len': ['error', { code: 130, ignoreComments: true, ignorePattern: '^import .*' }],
    'no-console': 'warn',
    'prefer-const': 'warn',
    'no-duplicate-imports': 'warn',
    'no-multi-spaces': 'warn',
    'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 1 }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off'
  },
  settings: {
    react: { version: 'detect' }
  }
};
