// eslint-disable-file @typescript-eslint/no-var-requires
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
  addBabelPlugin,
} = require('customize-cra');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { getThemeVariables } = require('antd/dist/theme');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = override(
  isDevelopment && addWebpackPlugin(new ReactRefreshWebpackPlugin()),
  isDevelopment && addBabelPlugin('react-refresh/babel'),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      ...getThemeVariables({
        dark: true,
        compact: false,
      }),
      'body-background': '#18191a',
      'component-background': '#464748',
    },
  }),
);
