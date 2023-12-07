import React, { FC } from 'react';

import { NavMenuWrapper, PageHeader, Title, Wrapper } from './SettingsTopbar.styled';
import CommonNavMenu from '../../../../components/shared/nav/CommonNavMenu';

const SettingsTopbar: FC = () => {
  const clientsMenu = [
    {
      title: 'Создание классификаторов',
      to: 'classificators'
    },
    {
      title: 'Способы оплаты',
      to: 'payments'
    }
  ];
  return (
    <>
      <Wrapper>
        <PageHeader>
          <Title>Настройки</Title>
        </PageHeader>
      </Wrapper>
      <NavMenuWrapper>
        <CommonNavMenu list={clientsMenu} />
      </NavMenuWrapper>
    </>
  );
};

export default SettingsTopbar;
