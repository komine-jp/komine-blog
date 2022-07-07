module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  // 优先级低于parse的语法解析配置
  parserOptions: {
    // 指定ESlint的解析器
    parser: '@typescript-eslint/parser',
    // 允许使用ES语法
    ecmaVersion: 2020,
    // 允许使用import
    sourceType: 'module',
    // 允许解析JSX
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ], // prettier 一定要是最后一个，才能确保覆盖配置
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: [2, 2, { SwitchCase: 1 }],
    '@typescript-eslint/no-explicit-any': ['off'],
    "vue/multi-word-component-names": ["off"],
    'vue/first-attribute-linebreak': ['warn', {
      'singleline': 'ignore',
      "multiline": "ignore"
    }],
    '@typescript-eslint/no-non-null-assertion': 'off'
  },
}
