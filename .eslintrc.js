module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true
  },

  plugins: ['eslint-plugin-standard'],
  extends: ['eslint:recommended', 'prettier'],
  overrides: [
    {
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
      // extends: ['prettier', 'standard']
    },
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      extends: ['eslint:recommended', 'prettier']
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: true,
    tsconfigRootDir: __dirname
  },
  rules: {}
};
