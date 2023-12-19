import { withRouterDecorator, withStyleDecorator, withSuspenseDecorator } from '../../src/shared/lib';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  layout: 'centered',

  decorators: [withStyleDecorator, withSuspenseDecorator, withRouterDecorator]
};
