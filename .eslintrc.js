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
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/react-in-jsx-scope': 'off',
    'max-len': ['error', { code: 130, ignoreComments: true, ignorePattern: '^import .*' }],
    'no-console': ['error', { allow: ['error'] }],
    'prefer-const': 'warn',
    'no-duplicate-imports': 'error',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 1 }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off'
  },
  settings: {
    react: { version: 'detect' }
  }
};

// {
//   "extends": ["airbnb", "airbnb-typescript"],

//   "rules": {
//     "no-underscore-dangle": ["error", { "allow": ["_id"] }]
//   },
//   "parserOptions": {
//     "project": ["path/to/your/tsconfig/file"]
//   }
// }
