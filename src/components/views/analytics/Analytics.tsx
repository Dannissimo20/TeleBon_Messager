import React from 'react';
import { Outlet } from 'react-router-dom';

import AnalyticsTopbar from '../../../pages/private/analytics/AnalyticsTopbar';
import { Wrapper } from '../PageStyled.styled';

export default function Analytics() {
  return (
    <Wrapper className='full-height'>
      <AnalyticsTopbar />
      <Outlet />
    </Wrapper>
  );
}
