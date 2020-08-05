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
  dva: {
    immer: true,
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
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
