import React from 'react';
import { Outlet } from 'react-router-dom';

import { Login, Logo } from './Registration.styled';

import { LoginLogo } from '../../icons';
import { RegAuthWrapper } from '../PageStyled.styled';

export default function Registration() {
  return (
    <RegAuthWrapper>
      <Outlet />
      {/* <RegistrationContainer /> */}
      <Login>
        <Logo>
          <LoginLogo />
        </Logo>
      </Login>
    </RegAuthWrapper>
  );
}
