import React from 'react';
import { Outlet } from 'react-router-dom';

import MessengerTopbar from '../../../pages/private/messenger/topbar/MessengerTopbar';
import { Wrapper } from '../PageStyled.styled';

export default function Messenger() {
  return (
    <Wrapper className='full-height'>
      <MessengerTopbar />
      <Outlet />
    </Wrapper>
  );
}
