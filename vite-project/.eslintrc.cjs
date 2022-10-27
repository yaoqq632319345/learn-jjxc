module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended', // 从 ESLint 本身继承；
    // 第3种情况，可以省略包名中的 `eslint-plugin`
    // 格式一般为: `plugin:${pluginName}/${configName}`
    'plugin:react/recommended', // eslint-plugin-react
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    // 1. 接入 prettier 的规则
    'prettier',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  // 添加 TS 规则，名称可省略`eslint-plugin`
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    // 3. 注意要加上这一句，开启 prettier 自动修复的功能
    'prettier/prettier': 'error',
    // 解决 /src/types/shim.d.ts 空的interface 报错
    '@typescript-eslint/no-empty-interface': 'off',
    // 解决使用windicss attributify 未知的dom 属性报错
    'react/no-unknown-property': 'off'
  },
  // 解决命令行中的 warning: React version not specified in eslint-plugin-react settings
  settings: {
    react: {
      version: '999.999.999'
    }
  }
};
