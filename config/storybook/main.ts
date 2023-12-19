import * as path from 'path';

import { Configuration, DefinePlugin, RuleSetRule } from 'webpack';

import { buildFileLoader } from '../build/loader/file.loader';
import { buildStyleLoader } from '../build/loader/style.loader';

/*
 * конфиг был прогнан через команду:
 * npx storybook@next automigrate
 * */
const config = {
  stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-mock',
    'storybook-addon-themes'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  core: {},
  docs: {
    autodocs: true
  }
};

export default config;
