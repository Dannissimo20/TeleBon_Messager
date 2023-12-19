import { Suspense } from 'react';

import { StoryFn } from '@storybook/react';

export const withSuspenseDecorator = (StoryComponent: StoryFn) => (
  <Suspense>
    <StoryComponent />
  </Suspense>
);
