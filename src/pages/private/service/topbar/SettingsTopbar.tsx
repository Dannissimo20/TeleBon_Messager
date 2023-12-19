import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { NavMenuWrapper } from './SettingsTopbar.styled';

import CommonNavMenu from '../../../../components/shared/nav/CommonNavMenu';
import { CommonPageTitle } from '../../../../components/shared/title/CommonPageTitle';

const SettingsTopbar: FC = () => {
  const { t } = useTranslation();
  const clientsMenu = [
    {
      title: 'Финансы',
      to: 'payments'
    }
  ];

  return (
    <>
      <CommonPageTitle title={t('Настройки')} />
      <NavMenuWrapper>
        <CommonNavMenu list={clientsMenu} />
      </NavMenuWrapper>
    </>
  );
};

export default SettingsTopbar;
