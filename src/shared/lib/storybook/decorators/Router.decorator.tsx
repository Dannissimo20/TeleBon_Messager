import { BrowserRouter } from 'react-router-dom';

import { StoryFn } from '@storybook/react';

export const withRouterDecorator = (StoryComponent: StoryFn) => (
  <BrowserRouter>
    <StoryComponent />
  </BrowserRouter>
);
