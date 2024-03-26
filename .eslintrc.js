module.exports = {
  env: {
    node: true
    // commonjs: true,
    // es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    // project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    //project: true,
    sourceType: 'ecmaVersion'
  },
  // plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'off'
  },
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['dist/'],
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
