import React from 'react';

import { Logo } from './Auth.styled';

import AuthContainer from '../../../pages/public/auth/AuthContainer';
import { LoginLogo } from '../../icons';
import { RegAuthWrapper } from '../PageStyled.styled';

export default function Auth() {
  return (
    <RegAuthWrapper>
      <div>
        <Logo>
          <LoginLogo />
        </Logo>
      </div>
      <AuthContainer />
    </RegAuthWrapper>
  );
}
