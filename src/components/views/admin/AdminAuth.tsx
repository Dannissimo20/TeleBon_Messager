import React from 'react';

import AdminContainer from '../../../pages/private/admin/container/AdminContainer';
import { LoginLogo } from '../../icons';
import { RegAuthWrapper } from '../PageStyled.styled';
import { Logo } from '../../../pages/public/register/registration-confirm/RegistrationConfirm.styled';

export default function AdminAuth() {
  return (
    <RegAuthWrapper>
      <div>
        <Logo>
          <LoginLogo />
        </Logo>
      </div>
      <AdminContainer />
    </RegAuthWrapper>
  );
}
