module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'eslint:recommended',
    '@nuxtjs/eslint-config-typescript',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/no-extraneous-dependencies': 'off',
    'vue/multi-word-component-names': 'off',
    'comma-dangle': ['error', 'only-multiline'],
    'semi': ['error', 'always'],
    'camelcase': ['error', {
      'properties': 'always',
      'ignoreGlobals': true,
      'ignoreImports': true,
    }],
    'no-trailing-spaces': 'error',
  },
};
