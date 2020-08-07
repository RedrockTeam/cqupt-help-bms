import { defineConfig } from 'umi';
import pxtoviewport from 'postcss-px-to-viewport';

export default defineConfig({
  outputPath: 'build',
  publicPath:
    process.env.NODE_ENV === 'production' ? '/game/cqupt-help-bms/' : '/',
  theme: {
    '@menu-item-height': '80px',
    '@menu-inline-toplevel-item-height': '80px',
    // '@table-expanded-row-bg': '#F5F8FF',
    // 'table-row-hover-bg': '#F5F8FF',
    '@select-border-color': 'transparent',
    '@select-background': '#F8FAFB',
    '@select-selection-item-bg': '#E5E9FF',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  mock: false,
  dva: {
    immer: true,
  },
  proxy: {
    '/api': {
      target: 'https://cyxbsmobile.redrock.team/wxapi/cyb-permissioncenter',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/qny': {
      target: 'https://cyxbsmobile.redrock.team/wxapi/red-qny',
      changeOrigin: true,
      pathRewrite: { '^/qny': '' },
    },
  },
  postcssLoader: {
    plugins: [
      pxtoviewport({
        unitToConvert: 'px',
        viewportWidth: 1920,
        unitPrecision: 5,
        propList: ['*'],
        viewportUnit: 'vw',
        fontViewportUnit: 'vw',
        selectorBlackList: [],
        minPixelValue: 1,
        mediaQuery: false,
        replace: true,
        exclude: [],
      }),
    ],
  },
});
