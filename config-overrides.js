// eslint-disable-file @typescript-eslint/no-var-requires
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
  addBabelPlugin,
  addBabelPreset,
} = require('customize-cra');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const { getThemeVariables } = require('antd/dist/theme');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = override(
  addWebpackPlugin(new AntdDayjsWebpackPlugin()),
  addBabelPreset('@babel/preset-typescript'),
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
