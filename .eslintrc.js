module.exports = {
  env: {
    node: true,
    // commonjs: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  // plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'off'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    //project: true,
    sourceType: 'module'
  },
  overrides: [
    // {
    //   files: ['.eslintrc.{js,cjs}'],
    //   parserOptions: {
    //     sourceType: 'script'
    //   }
    //   // extends: ['prettier', 'standard']
    // },
    // {
    //   files: ['*.js', '*/**/*.js', '*.ts', '*/**/*.ts'],
    //   extends: ['eslint:recommended', 'prettier']
    // },
    // {
    //   files: ['*.mjs', '*/**/*.mjs'],
    //   parserOptions: {
    //     sourceType: 'module'
    //   }
    // }
  ]
};
